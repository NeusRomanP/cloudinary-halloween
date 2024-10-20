<template>
  <teleport to='body'>
    <div class="modal-container hidden">
      <div class="gallery-modal">
        <h2>Uploaded images</h2>
        <div class="gallery-container">
          <div class="gallery-scroll">
            <div v-if="myImages.length" class="gallery">
              <div v-for="(img, key) in images" :key="key" class="item" @click="$emit('setImage', img)">
                <img :src="img.url">
              </div>
            </div>
            <div v-else class="gallery">
              <p>You haven't uploaded any image yet!</p>
            </div>
          </div>
          
        </div>
        <button @click="closeModal">Close</button>
      </div> 
    </div>
    
  </teleport>
</template>
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['setImage']);
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const myImages = ref(props.images ?? []);

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

  .gallery-container {
    flex: 1;
    overflow: hidden;
  }

  .gallery-scroll {
    max-height: 100%;
    overflow: auto;
    padding-right: 8px;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, .5fr));
    gap: 16px;
  }

  .gallery .item {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    cursor: pointer;
    border-radius: 16px;
  }

  .gallery .item:hover {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    box-shadow: 0 0 8px white;
  }

  .gallery .item:hover img {
    transform: scale(1.5);
  }

  .gallery .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1s;
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

  /* Scrollbar */
  .gallery-scroll::-webkit-scrollbar {
    width: 12px;
  }

  .gallery-scroll::-webkit-scrollbar-track {
    background: black;
    border-radius: 10px;
  }

  .gallery-scroll::-webkit-scrollbar-thumb {
    background-color: orange;
    border-radius: 10px;
    border: 2px solid black;
  }

  @media screen and (max-width: 430px) {
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
    }
  }
</style>