<template>
  <div>
    <h1>holaaa</h1>
    <div>
      <CldUploadWidget v-slot="{ open }" uploadPreset="nuxt-cloudinary-unsigned">
        <button type="button" @click="open">Upload an Image</button>
      </CldUploadWidget>
    </div>
  </div>
</template>