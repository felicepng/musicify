import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async (event) => {
  const { clientId, clientSecret } = useRuntimeConfig()
  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });

  const params = new URLSearchParams(event.node.req.url!.split("?")[1]);
  const genre = params.get("genre")
  const artist = params.get("artist")

  try {
    const creds = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(creds.body.access_token)
    const res = await spotifyApi.searchTracks(`genre:${genre}${artist ? ' artist:' + artist : ''}`, { limit: 5 })

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