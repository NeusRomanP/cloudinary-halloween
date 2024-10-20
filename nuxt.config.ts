// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'SpookIA - Spookify Your Photos'
    }
  },
  build: {
    transpile: ['nuxt-storage']
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/cloudinary"],

  runtimeConfig: {
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    }
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    analytics: true
  },
  compatibilityDate: "2024-10-19"
})