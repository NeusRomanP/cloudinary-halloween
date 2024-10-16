<template>
  <div>
    <h2>Choose how your spookie photo will be</h2>
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
</template>
<script setup>
  import { ref } from "vue";
  import { useRuntimeConfig } from "#app";

  const config = useRuntimeConfig();
  const cloudName = config.public.cloudinaryCloudName;

  let imageUrl = ref("https://res.cloudinary.com/dhtztzsnk/image/upload/v1728840828/kfvuamjbsfnqdmbw5ge6.jpg");
  let id = ref("kfvuamjbsfnqdmbw5ge6");
  let image;

  onMounted(() => {
    image = document.getElementById('img');
  });

  function uploadSuccess(result) {
    imageUrl.value = result.info.secure_url;
    id.value = result.info.public_id;
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
  
</script>
<style scoped>
  h2 {
    color: orange;
    text-shadow: 0 0 2 white;
    text-align: center;
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
</style>