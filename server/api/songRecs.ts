import SpotifyWebApi from 'spotify-web-api-node';
import { Artist, SearchResult } from '~~/consts/consts';

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
    const recs = res.body.tracks?.items ? formatRes(res.body.tracks.items) : [];

    return {
      recs,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
});

const formatRes = (items: SpotifyApi.TrackObjectFull[]): SearchResult[] => {
  return items.map((rec) => {
    const artists: Artist[] = rec.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      url: artist.external_urls.spotify,
    }));

    return {
      id: rec.id,
      name: rec.name,
      url: rec.external_urls.spotify,
      preview_url: rec.preview_url,
      album: {
        name: rec.album.name,
        url: rec.album.external_urls.spotify,
        image: rec.album.images[1].url,
      },
      artists,
    };
  });
};
