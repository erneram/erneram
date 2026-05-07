<script setup lang="ts">
/**
 * @component CardAboutMe
 * Personal information card with hover effect
 */
</script>

<template>
  <div class="relative group">
    <a
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-white dark:hover:bg-gray-700 transition-all duration-300 overflow-hidden"
    >
      <!-- Main Content -->
      <div
        class="flex flex-col justify-between p-4 leading-normal group-hover:opacity-0 transition-opacity duration-500"
      >
        <h5 class="mb-2 font-Yeseva text-4xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-black">
          Ernesto Ascencio
        </h5>
        <p class="mb-3 font-Josefin text-gray-700 dark:text-black">
          Estudiante de Ciencias de la Computación de la Universidad del Valle de Guatemala
        </p>
      </div>

      <!-- Image -->
      <img
        class="order-first md:order-last object-cover w-full rounded-t-lg h-96 md:h-auto md:w-64 md:rounded-none md:rounded-s-lg group-hover:opacity-0 transition-opacity duration-500"
        src="/ernestogray.png"
        alt="Ernesto Ascencio"
      />

      <!-- Extra Information (Hover) -->
      <div
        class="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center bg-white rounded-lg w-full h-full overflow-y-auto"
      >
        <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-Josefin">
          Soy un desarrollador fullstack con especial interés en el desarrollo frontend y en el diseño centrado en el
          usuario a través de principios de UI/UX y User Experience. Me entusiasma descubrir nuevas tecnologías,
          mantenerme en constante aprendizaje y transformar ideas en experiencias digitales funcionales y atractivas.
          Además del desarrollo, me motiva cultivar hobbies, mantenerme activo practicando deporte y vivir cada etapa
          del proceso con energía y propósito.
        </p>
      </div>
    </a>
  </div>
</template>
