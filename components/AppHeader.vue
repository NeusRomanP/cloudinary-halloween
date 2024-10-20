<template>
  <div class="header">
    <div class="pumpkin left">
      <div class="eyes">
        <div class="left eye"></div>
        <div class="right eye"></div>
      </div>
      <div class="nose"></div>
      <div class="mouth"></div>
    </div>
    <div>
      <h1>SpookIA</h1>
      <h2>Spookify your photos</h2>  
    </div>
    <div class="pumpkin right">
      <div class="eyes">
        <div class="left eye"></div>
        <div class="right eye"></div>
      </div>
      <div class="nose"></div>
      <div class="mouth"></div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-family: october-crow, sans-serif;
  color: orange;
  text-align: center;
  text-shadow: 0 0 5px white;
}

h2 {
  font-family: october-crow, sans-serif;
  color: orange;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 0 0 5px white;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px;
}

.pumpkin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  max-width: 30%;
  height: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid black;
  background: orange;
  filter: drop-shadow(0 0 5px white);
  padding: 0.5%;
  box-sizing: border-box;
  align-self: center;
}

.pumpkin.left {
  transform: rotate3d(0, 1, 1, 30deg);
}

.pumpkin.right {
  transform: rotate3d(0, 1, 1, -30deg);
}

.pumpkin .eyes {
  display: flex;
  justify-content: space-around;
}

.pumpkin .eyes .eye {
  background: black;
  width: 30%;
  aspect-ratio: 2/1;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
}

.pumpkin .eye.left{
  transform: rotate(30deg);
}

.pumpkin .eye.right{
  transform: rotate(-30deg);
}

.pumpkin .nose {
  aspect-ratio: 1;
  align-self: center;
  border-bottom: 5px solid black;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  margin-top: 5%;
}

.pumpkin .mouth {
  width: 80%;
  aspect-ratio: 2/1;
  align-self: center;
  background-color: black;
  clip-path: polygon(
    10% 40%, 25% 60%, 50% 40%, 75% 60%, 90% 40%,
    75% 80%, 50% 70%, 25% 80%, 10% 40%
  );

  animation: pumpkin-mouth 2s infinite;
}

@keyframes pumpkin-mouth {
  0% {
    clip-path: polygon(
      10% 40%, 25% 60%, 50% 40%, 75% 60%, 90% 40%,
      75% 80%, 50% 70%, 25% 80%, 10% 40%
    );
  }

  50% {
    clip-path: polygon(
      10% 80%, 25% 55%, 50% 70%, 75% 55%, 90% 80%,
      75% 70%, 50% 100%, 25% 70%, 10% 80%
    );
  }

  100% {
    clip-path: polygon(
      10% 40%, 25% 60%, 50% 40%, 75% 60%, 90% 40%,
      75% 80%, 50% 70%, 25% 80%, 10% 40%
    );
  }
}

@media only screen and (max-width: 540px){
  .pumpkin {
    width: 60px;
    height: 60px;
    aspect-ratio: 1;
    align-self: center;
  }
}
</style>