import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async () => {
  const { clientId, clientSecret } = useRuntimeConfig()
  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });

  try {
    const creds = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(creds.body.access_token)
    const res = await spotifyApi.searchTracks('genre:Chill Pop', { limit: 5 })

    return {
      tracks: res.body.tracks?.items || []
    }
  } catch (e) {
    return {
      tracks: [],
      error: e
    }
  }
})