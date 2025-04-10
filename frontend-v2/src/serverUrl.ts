export const serverUrl =
  import.meta.env.MODE === 'development'
    ? '' // use Vite proxy
    : 'https://journey-with-quran-api.onrender.com';
