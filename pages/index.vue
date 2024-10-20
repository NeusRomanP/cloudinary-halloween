<template>
  <div class="relative">
    <button class="open-modal__button" @click="openModal">
      Uploaded images
    </button>
    <div class="upload-button-container">
      <CldUploadWidget v-slot="{ open }" @success="uploadSuccess"
                       uploadPreset="nuxt-cloudinary-unsigned"
                       :options="{
                        sources: ['local', 'camera'],
                        multiple: false,
                        maxFiles: 1,
                        styles: {
                          palette: {
                            window: 'black',
                            windowBorder: 'orange',
                            tabIcon: '#FFC156',
                            menuIcons: 'orange',
                            textDark: '#000000',
                            textLight: 'orange',
                            link: 'orange',
                            action: 'orange',
                            inactiveTabIcon: 'orange',
                            error: 'red',
                            inProgress: 'orange',
                            complete: 'orange',
                            sourceBg: '#151515'
                          },
                        }
                       }">
        <button type="button" @click="open">
          <span>
            Upload an Image
          </span>
        </button>
      </CldUploadWidget>
    </div>
    <div v-if="imageUrl" class="image-container">
      <ConverterOptions @transform-photo="(type, target) => transformPhoto(type, target)"/>
      <p v-if="loading" class="loading">Loading...</p>
      <img :src="imageUrl" alt="Imagen subida" id="img"/>
    </div>
    <div v-else>
      <p class="no-image">Upload an image to spookify</p>
    </div>
  </div>
  <<ClientOnly >
    <UploadedImages @setImage="setImage" :images="myImages" />
  </ClientOnly>
</template>
<script setup>
  import { ref } from "vue";
  import { useRuntimeConfig } from "#app";
  import nuxtStorage from 'nuxt-storage';

  const config = useRuntimeConfig();
  const cloudName = config.public.cloudinaryCloudName;

  const myImages = ref([]);
  const loading = ref(false);
// "https://res.cloudinary.com/dhtztzsnk/image/upload/v1728840828/kfvuamjbsfnqdmbw5ge6.jpg"
// "kfvuamjbsfnqdmbw5ge6"
  const imageUrl = ref('');
  const id = ref('');
  let image;

  onMounted(() => {
    myImages.value = nuxtStorage.localStorage.getData('images') || [];
    imageUrl.value = myImages.value[0]?.url ?? '';
    id.value = myImages.value[0]?.id ?? '';
    image = document.getElementById('img');
  });

  function uploadSuccess(result) {
    imageUrl.value = result.info.secure_url;
    id.value = result.info.public_id;
    image = document.getElementById('img');
    let imgs = nuxtStorage.localStorage.getData('images') || [];
    imgs.unshift({
      id: id.value,
      url: imageUrl.value
    });

    myImages.value = imgs;
    nuxtStorage.localStorage.setData('images', imgs, 365 * 5, 'd');
  }

  function setImage(img) {
    imageUrl.value = img.url;
    id.value = img.id;
    image = document.getElementById('img');
    document.querySelector('.modal-container').classList.add('hidden');
  }

  function transformPhoto(type, target) {
    image = document.getElementById('img');
    image.style.opacity = .3;
    loading.value = true;

    let ok = false;

    let options = {};
    if (target === 'character') {
      options = {
        src: id.value,
        replace: {
          from: 'Main character',
          to: `Scary ${type}`
        }
      } 
    } else {
      options = {
        src: id.value,
        replaceBackground: `Add scary ${type}s to the background`
      }
    }
    let counter = 0;
    while (!ok && counter < 5) {
      try {
        const {url} = useCldImageUrl(
          {
            options: options,
          },
        );
        imageUrl.value = url;
  
        image.onload = () => {
          loading.value = false;
          image.style.opacity = '1';
          ok = true;
        }
      } catch (error) {
        loading.value = false;
        image.style.opacity = '1';
        ok = false;
        console.log('error')
      }
      counter++;
    }
  }

  function openModal() {
    document.querySelector('.modal-container').classList.remove('hidden');
  }

  function loadImages() {
    myImages.value = nuxtStorage.localStorage.getData('images') || [];
  }

  onMounted(() => {
    loadImages();
    window.addEventListener('storage', loadImages);
  });

  onUnmounted(() => {
    window.removeEventListener('storage', loadImages);
  });
  
</script>
<style scoped>
  h2 {
    color: orange;
    text-shadow: 0 0 2 white;
    text-align: center;
  }

  .upload-button-container {
    margin-top: 16px;
  }

  .upload-button-container button {
    width: 90%;
    max-width: 500px;
    aspect-ratio: 3/1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  button {
    background-color: orange;
    color: black;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0 0 5px white;
    padding: 8px 16px;
    display: flex;
    margin: auto;
    cursor: pointer;
  }

  .image-container {
    width: 90%;
    max-width: 500px;
    margin: auto;
    margin-bottom: 40px;
  }

  .image-container img {
    display: inline-block;
    width: 100%;
  }

  .relative {
    position: relative;
  }

  .open-modal__button {
    margin: auto;
    margin-top: 16px;
  }

  .no-image {
    color: orange;
    font-size: 1.2rem;
    text-align: center;
    width: 90%;
    max-width: 500px;
    margin: auto;
    margin-top: 32px
  }

  .loading {
    color: orange;
    font-size: 1.2rem;
    text-align: center;
  }

  @media screen and (max-width: 500px) {
    .open-modal__button {
      position: static;
      display: block;
      margin: auto;
      margin-top: 16px;
      width: fit-content;
    }
  }

</style>