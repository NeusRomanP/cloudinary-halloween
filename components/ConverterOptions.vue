<template>
  <div>
    <div class="radios">
      <label @click="changeTarget" class="checked">
        <input type="radio" name="target" value="character" checked>
        <i></i>
        <span>Main character </span>
      </label>
      <label @click="changeTarget">
        <input type="radio" name="target" value="background">
        <i></i>
        <span>Background</span>
      </label>
    </div>
    <div class="buttons">
        <button @click="$emit('transform-photo', 'zombie', target)">
          Zombie
        </button>
        <button @click="$emit('transform-photo', 'ghost', target)">
          Ghost
        </button>
        <button @click="$emit('transform-photo', 'demon', target)">
          Demon
        </button>
      </div>
  </div>
</template>
<script setup>

import { ref } from "vue";

defineEmits(['transform-photo']);

const target = ref('character');

function changeTarget(e) {
  let lastChecked = document.querySelector('.radios label.checked');
  lastChecked.classList.remove('checked');
  e.target.closest('label').classList.add('checked');
  target.value = e.target.value;
}

</script>
<style scoped>
  button {
    background-color: orange;
    color: black;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0 0 5px white;
    padding: 8px 16px;
    display: flex;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-block: 16px;
  }

  .radios {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    color: orange;
    margin-top: 16px;
  }

  .radios input {
    display: none;
  }

  .radios span {
    display: inline-block;
    padding-left: 30px;
  }
  
  .radios i::before {
    content: '';
    position: absolute;
    background: url('../icons/CircleIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    color: orange;
    width: 20px;
    aspect-ratio: 1;
  }

  .radios .checked i::before {
    content: '';
    position: absolute;
    background: url('../icons/PumpkinIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    color: orange;
    width: 20px;
    aspect-ratio: 1;
  }

</style>