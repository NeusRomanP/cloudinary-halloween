<template>
  <teleport to='body'>
    <div class="modal-container hidden">
      <div class="gallery-modal">
        <h2>Uploaded images</h2>
        <div v-if="myImages.length" class="gallery">
          <div v-for="(img, key) in myImages" :key="key" class="item" @click="$emit('setImage', img)">
            <img :src="img.url">
          </div> 
        </div>
        <div v-else class="gallery">
          <p>You haven't uploaded any image yet!</p>
        </div>
        <button @click="closeModal">Close</button>
      </div> 
    </div>
    
  </teleport>
</template>
<script setup>
import { getData, setData } from 'nuxt-storage/local-storage';
import { ref } from 'vue';

const emit = defineEmits(['setImage']);

const myImages = ref([]);

let storage = getData('images');

if (storage) {
  loadImages();
}

function loadImages() {
  storage.forEach(image => {
      myImages.value.unshift({
        url: image.url,
        id: image.id
      });
  });
}

function closeModal() {
  document.querySelector('.modal-container').classList.add('hidden');
}
</script>

<style scoped>
  .modal-container {
    z-index: 9;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gallery-modal {
    max-width: 1000px;
    width: 90%;
    height: 90vh;
    background-color: black;
    padding: 16px;
    box-shadow: 0 0 4px white;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, .5fr));
    gap: 16px;
    flex: 1;
  }

  .gallery .item {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .gallery .item img {
    width: 100%;
    object-fit: cover;
  }

  .gallery p {
    font-size: 1.2rem;
    color: orange;
    text-align: center;
    align-self: center;
  }

  h2 {
    color: orange;
    font-family: october-crow;
    text-shadow: 0 0 4px white;
    text-align: center;
  }

  button {
    background-color: orange;
    color: black;
    width: fit-content;
    justify-self: center;
    align-self: center;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0 0 5px white;
    padding: 8px 16px;
    display: flex;
    cursor: pointer;
  }

  .hidden {
    display: none;
  }
</style>