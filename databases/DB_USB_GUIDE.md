# DB USB — Guía de uso

Mueve tu base de datos MySQL entre tu máquina y una USB para liberar espacio cuando no la necesitas.

---

## Configuración inicial

Solo edita tu usuario de MySQL en `db_usb.sh` si no usas `root`:

```bash
DB_USER="root"
```

Dale permisos de ejecución (solo la primera vez):

```bash
chmod +x db_usb.sh
```

---

## Comandos

```
./db_usb.sh <db_name> <export|import> [usb_name]
```

| Argumento | Descripción | Ejemplo |
|-----------|-------------|---------|
| `db_name` | Nombre de la base de datos | `schoolbuzz` |
| `export` / `import` | Acción a realizar | `export` |
| `usb_name` *(opcional)* | Nombre de la USB en `/Volumes/` | `MiUSB` (por defecto: `USB`) |

### Exportar → guardar en USB y liberar espacio local

```bash
./db_usb.sh schoolbuzz export
./db_usb.sh schoolbuzz export MiUSB   # si tu USB tiene otro nombre
```

- Guarda el backup como `schoolbuzz.sql` dentro de la USB
- Pregunta si deseas borrar la base local

### Importar → restaurar desde USB

```bash
./db_usb.sh schoolbuzz import
./db_usb.sh schoolbuzz import MiUSB
```

- Crea la base si no existe
- Restaura los datos desde la USB

> Para ver el nombre exacto de tu USB: `ls /Volumes/`

---

## Flujo típico

```
1. Terminas de trabajar
        ↓
2. ./db_usb.sh schoolbuzz export MiUSB   ← guarda en USB y borra local
        ↓
3. Desconectas la USB

─── días después ───

4. Conectas la USB
        ↓
5. ./db_usb.sh schoolbuzz import MiUSB   ← restaura en tu máquina
        ↓
6. Trabajas normalmente
```

---

## Notas

- El script **pide tu contraseña de MySQL** en cada operación (comportamiento normal).
- Si tu base es grande, puedes comprimir el backup manualmente:
  ```bash
  mysqldump -u root -p nombre_base | gzip > /Volumes/USB/respaldo.sql.gz
  ```
- Guarda siempre una copia extra del `.sql` por seguridad.
- El `DROP DATABASE` es **irreversible** — asegúrate de que el export fue exitoso antes de confirmar.
