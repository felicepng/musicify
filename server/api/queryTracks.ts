import SpotifyWebApi from 'spotify-web-api-node';

export default defineEventHandler(async (event) => {
  try {
    const { clientId, clientSecret } = useRuntimeConfig();
    const spotifyApi = new SpotifyWebApi({
      clientId,
      clientSecret,
    });
    const creds = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(creds.body.access_token);

    const query = getQuery(event);
    const params = Object.entries(query)
      .map(
        ([key, val]) =>
          `${encodeURIComponent(key)}:${encodeURIComponent(val as string)}`
      )
      .join(' ');

    const res = await spotifyApi.searchTracks(params, { limit: 5 });

    return {
      recs: res.body.tracks?.items || [],
    };
  } catch (e) {
    return {
      error: e,
    };
  }
});
