<template>
  <div>
    <h1>holaaa</h1>
    <div>
      <CldUploadWidget v-slot="{ open }"
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
  </div>
</template>