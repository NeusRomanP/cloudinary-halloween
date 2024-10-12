<template>
  <div class="footer"></div>
  <span>Created by Neus Roman</span>
</template>
<style scoped>

footer span{
  color: black;
  font-size: 1.2rem;
  font-weight: 800;
  text-align: center;
  position: absolute;
  text-shadow: 0 0 2px white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.footer {
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 50% 50% / 70% 70% 0% 0%;
  filter: drop-shadow(0 10px 10px #F008)
          drop-shadow(0 -10px 10px #F008)
          drop-shadow(0 -30px 30px #F008)
          blur(10px);
  background-color: #F001;
  animation: footer-animation 4s infinite;
}

@keyframes footer-animation {
  0% {
    height: 110px;
  }

  35% {
    height: 90px;
  }

  50% {
    height: 100px;
  }

  65% {
    height: 90px;
  }

  100% {
    height: 110px;
  }
}
</style>