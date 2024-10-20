<template>
  <div class="relative">
    <button class="open-modal__button" @click="openModal">
      Uploaded images
    </button>
    <h2>Choose an image to spookify</h2>
    <div>
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
        <button type="button" @click="open">Upload an Image</button>
      </CldUploadWidget>
    </div>
    <div v-if="imageUrl" class="image-container">
      <ConverterOptions @transform-photo="(type, target) => transformPhoto(type, target)"/>
      <img :src="imageUrl" alt="Imagen subida" id="img"/>
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

  let imageUrl = ref("https://res.cloudinary.com/dhtztzsnk/image/upload/v1728840828/kfvuamjbsfnqdmbw5ge6.jpg");
  let id = ref("kfvuamjbsfnqdmbw5ge6");
  let image;

  onMounted(() => {
    image = document.getElementById('img');
    myImages.value = nuxtStorage.localStorage.getData('images') || [];
  });

  function uploadSuccess(result) {
    imageUrl.value = result.info.secure_url;
    id.value = result.info.public_id;
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
    document.querySelector('.modal-container').classList.add('hidden');
  }

  function transformPhoto(type, target) {
    image.style.opacity = '.3';

    let options = {};
    if (target === 'character') {
      options = {
        src: id.value,
        replace: {
          from: 'Main character',
          to: type
        }
      } 
    } else {
      options = {
        src: id.value,
        replaceBackground: `Add ${type}s to the background`
      }
    }

    const {url} = useCldImageUrl(
      {
        options: options,
      },
    );

    imageUrl.value = url;

    image.onload = () => {
      image.style.opacity = '1';
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
    padding-top: 64px;
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
    position: absolute;
    top: 0;
    right: 16px;
  }

  @media screen and (max-width: 500px) {
    .open-modal__button {
      position: absolute;
      top: 0;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      width: fit-content;
    }
  }

</style>