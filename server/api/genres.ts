import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async () => {
  try {
    const { clientId, clientSecret } = useRuntimeConfig();
    const spotifyApi = new SpotifyWebApi({
      clientId,
      clientSecret,
    });
    const creds = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(creds.body.access_token);

    const res = await spotifyApi.getAvailableGenreSeeds();

    return res.body;
  } catch (e) {
    return e.body;
  }
});
