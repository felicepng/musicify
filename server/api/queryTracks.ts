import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async (event) => {
  try {
    const { clientId, clientSecret } = useRuntimeConfig()
    const spotifyApi = new SpotifyWebApi({
      clientId,
      clientSecret,
    });
    const creds = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(creds.body.access_token)

    const urlParams = new URLSearchParams(event.node.req.url!.split("?")[1]);
    const params = Array.from(urlParams).map(([key, val]) => `${encodeURIComponent(key)}:${encodeURIComponent(val)}`).join(' ');
    const res = await spotifyApi.searchTracks(params, { limit: 5 })

    return {
      recs: res.body.tracks?.items || []
    }
  } catch (e) {
    return {
      error: e
    }
  }
})