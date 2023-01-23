<template>
  <nav
    class="
      z-10
      top-0
      sticky
      bg-primary
      w-full
      py-6
      px-9
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
        md:text-2xl
        flex
        gap-x-2
        md:gap-x-3
        items-center
      "
    >
      <Icon
        name="material-symbols:sound-sensing"
        class="w-7 h-7 md:w-8 md:h-8"
      />
      <h1>musicify</h1>
    </NuxtLink>
    <a target="_blank" href="https://felicepng.com">
      <img
        src="~/assets/portfolio.png"
        alt="My Portfolio"
        class="h-[26px] md:h-8 w-[26px] md:w-8"
      />
    </a>
  </nav>
</template>
