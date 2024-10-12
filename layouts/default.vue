<template>
  <div class="full-height flex-stretch overflow-hidden">
    <header>
      <AppHeader />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>
<style lang="css" scoped>
.full-height{
  min-height: 100dvh;
}

.flex-stretch{
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.overflow-hidden{
  overflow: hidden;
}

header {
  background-color: black;
  border-bottom: 2px solid orange;
}

footer {
  position: relative;
}

main {
  flex: 1;
}
</style>