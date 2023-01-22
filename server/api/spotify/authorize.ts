const serialize = (obj: Object) => {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  return arr.join("&");
}

export default defineEventHandler(async (event) => {
  const { clientId: client_id } = useRuntimeConfig()
  const redirect_uri = process.env.NODE_ENV === "production" ? "https://musicify-felicepng.vercel.app/callback" : 'http://localhost:3000/callback';

  const res = await $fetch('https://accounts.spotify.com/authorize?' +
    serialize({
      client_id,
      response_type: 'code',
      redirect_uri,
    }));

  console.log(res)

  return {
    done: true
  }
})