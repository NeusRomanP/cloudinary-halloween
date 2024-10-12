<template>
  <div class="footer"></div>
  <span>Created by Neus Roman</span>
</template>
<style scoped>
.footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50% 50% / 70% 70% 0% 0%;
  filter: drop-shadow(0 10px 10px #F008)
          drop-shadow(0 -10px 10px #F008)
          drop-shadow(0 -30px 30px #F008)
          blur(10px);
  background-color: #F001;
  /* background: linear-gradient(#F001 30%, #F002 90%,  #F003); */
}

footer span{
  color: black;
  font-size: 1.2rem;
  font-weight: 800;
  position: absolute;
  text-shadow: 0 0 2px white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>