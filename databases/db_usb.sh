#!/bin/bash

# Uso: ./db_usb.sh <db_name> <export|import> [usb_name] [--user usuario] [--pass contraseña]
#
# Ejemplos:
#   ./db_usb.sh schoolbuzz export                          # root sin contraseña
#   ./db_usb.sh schoolbuzz export MiUSB                   # USB con nombre distinto
#   ./db_usb.sh schoolbuzz export MiUSB --user hp         # usuario distinto, sin contraseña
#   ./db_usb.sh schoolbuzz import MiUSB --user hp --pass secret

DB_NAME="$1"
ACTION="$2"

# ── Defaults ────────────────────────────────────────────────────
USB_LABEL="ARES"
DB_USER="root"
DB_PASS=""

# ── Parsear argumentos posicionales y flags ──────────────────────
shift 2
while [[ $# -gt 0 ]]; do
  case "$1" in
    --user) DB_USER="$2"; shift 2 ;;
    --pass) DB_PASS="$2"; shift 2 ;;
    --*)    echo "✗ Flag desconocido: $1"; exit 1 ;;
    *)      USB_LABEL="$1"; shift ;;   # tercer posicional = nombre USB
  esac
done

USB_PATH="/Volumes/$USB_LABEL"
FULL_PATH="$USB_PATH/${DB_NAME}.sql"

# Construir args de autenticación MySQL
MYSQL_AUTH="-u $DB_USER"
if [ -n "$DB_PASS" ]; then
  MYSQL_AUTH="$MYSQL_AUTH -p$DB_PASS"
fi

# ── Validar argumentos obligatorios ─────────────────────────────
if [ -z "$DB_NAME" ] || [ -z "$ACTION" ]; then
  echo "Uso: ./db_usb.sh <db_name> <export|import> [usb_name] [--user usuario] [--pass contraseña]"
  echo ""
  echo "  ./db_usb.sh schoolbuzz export"
  echo "  ./db_usb.sh schoolbuzz export MiUSB"
  echo "  ./db_usb.sh schoolbuzz export MiUSB --user hp --pass secret"
  echo "  ./db_usb.sh schoolbuzz import MiUSB --user hp"
  exit 1
fi

# ── Funciones ────────────────────────────────────────────────────
export_db() {
  echo "→ Verificando USB en $USB_PATH..."
  if [ ! -d "$USB_PATH" ]; then
    echo "✗ USB '$USB_LABEL' no encontrada. Conéctala o verifica el nombre con: ls /Volumes/"
    exit 1
  fi

  # Obtener tablas y vistas por separado
  TABLES=$(mysql $MYSQL_AUTH -N -e "SHOW FULL TABLES IN \`$DB_NAME\` WHERE Table_type='BASE TABLE';" 2>/dev/null | awk '{print $1}')
  VIEWS=$(mysql $MYSQL_AUTH -N -e "SHOW FULL TABLES IN \`$DB_NAME\` WHERE Table_type='VIEW';" 2>/dev/null | awk '{print $1}')

  TABLE_COUNT=$(echo "$TABLES" | grep -c .)
  VIEW_COUNT=$(echo "$VIEWS" | grep -c .)
  SKIPPED_VIEWS=()

  echo "→ Encontradas $TABLE_COUNT tablas y $VIEW_COUNT vistas en '$DB_NAME'"
  echo ""

  # Volcar esquema general (sin datos, sin vistas por ahora)
  mysqldump $MYSQL_AUTH --single-transaction --set-gtid-purged=OFF \
    --no-data --skip-triggers "$DB_NAME" > "$FULL_PATH" 2>/dev/null

  # Volcar datos tabla por tabla con progreso
  i=0
  while IFS= read -r TABLE; do
    [ -z "$TABLE" ] && continue
    i=$((i + 1))
    printf "  [%d/%d] %-40s\r" "$i" "$TABLE_COUNT" "$TABLE"
    mysqldump $MYSQL_AUTH --single-transaction --set-gtid-purged=OFF \
      --no-create-info --skip-triggers "$DB_NAME" "$TABLE" >> "$FULL_PATH" 2>/dev/null
  done <<< "$TABLES"
  echo ""

  # Intentar volcar vistas individualmente, saltar las rotas
  if [ -n "$VIEWS" ]; then
    echo "→ Exportando vistas..."
    while IFS= read -r VIEW; do
      [ -z "$VIEW" ] && continue
      ERR=$(mysqldump $MYSQL_AUTH --single-transaction --set-gtid-purged=OFF \
        "$DB_NAME" "$VIEW" 2>&1 >> "$FULL_PATH")
      if [ $? -ne 0 ]; then
        SKIPPED_VIEWS+=("$VIEW")
      fi
    done <<< "$VIEWS"
  fi

  echo ""
  echo "✓ Backup guardado en $FULL_PATH"

  if [ ${#SKIPPED_VIEWS[@]} -gt 0 ]; then
    echo "⚠ Vistas omitidas por definer inválido:"
    for V in "${SKIPPED_VIEWS[@]}"; do
      echo "    - $V"
    done
  fi

  echo ""
  read -p "¿Borrar la base de datos local '$DB_NAME'? (s/N): " confirm
  if [[ "$confirm" =~ ^[sS]$ ]]; then
    mysql $MYSQL_AUTH -e "DROP DATABASE \`$DB_NAME\`;"
    echo "✓ Base '$DB_NAME' eliminada localmente. Espacio liberado."
  else
    echo "→ Base local conservada. Solo se hizo backup."
  fi
}

import_db() {
  echo "→ Verificando USB en $USB_PATH..."
  if [ ! -d "$USB_PATH" ]; then
    echo "✗ USB '$USB_LABEL' no encontrada. Conéctala o verifica el nombre con: ls /Volumes/"
    exit 1
  fi

  if [ ! -f "$FULL_PATH" ]; then
    echo "✗ Archivo $FULL_PATH no encontrado en la USB."
    exit 1
  fi

  echo "→ Creando base de datos '$DB_NAME'..."
  mysql $MYSQL_AUTH -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\`;"

  if [ $? -ne 0 ]; then
    echo "✗ Error al crear la base. Verifica usuario y contraseña."
    exit 1
  fi

  echo "→ Restaurando desde USB..."
  mysql $MYSQL_AUTH "$DB_NAME" < "$FULL_PATH"

  if [ $? -ne 0 ]; then
    echo "✗ Error al restaurar. El archivo puede estar corrupto."
    exit 1
  fi

  echo "✓ Base '$DB_NAME' restaurada correctamente desde USB."
}

# ── Acción ───────────────────────────────────────────────────────
case "$ACTION" in
  export) export_db ;;
  import) import_db ;;
  *)
    echo "✗ Acción desconocida: '$ACTION'. Usa 'export' o 'import'."
    exit 1
    ;;
esac
