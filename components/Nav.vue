<template>
  <nav
    class="
      z-20
      top-0
      sticky
      bg-primary
      w-full
      p-6
      flex
      justify-between
      items-center
    "
  >
    <NuxtLink
      to="/"
      class="
        font-semibold
        text-xl
        sm:text-2xl
        flex
        gap-x-2
        sm:gap-x-3
        items-center
      "
    >
      <Icon
        name="material-symbols:sound-sensing"
        class="w-7 h-7 sm:w-8 sm:h-8"
      />
      <h1>musicify</h1>
    </NuxtLink>
    <a target="_blank" href="https://felicepng.com">
      <img
        src="~/assets/portfolio.png"
        alt="My Portfolio"
        class="h-[26px] sm:h-8 w-[26px] sm:w-8"
      />
    </a>
  </nav>
</template>
