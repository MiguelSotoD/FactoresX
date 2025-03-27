import React from 'react'

export default function Footer() {
  return (
<footer class="bg-white rounded-lg shadow-sm mx-8 mt-10">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center ">© 2025 <a href="https://flowbite.com/" class="hover:underline">FactoresX™</a>
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Cuestionario</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Politicas de privacidad</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contactanos</a>
        </li>
    </ul>
    </div>
</footer>
  )
}
