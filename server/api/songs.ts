import SpotifyWebApi from 'spotify-web-api-node';
import { Artist, SearchResult } from '~~/consts/models';

export default defineEventHandler(async (event) => {
  try {
    const { clientId, clientSecret } = useRuntimeConfig();
    const spotifyApi = new SpotifyWebApi({
      clientId,
      clientSecret,
    });
    const creds = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(creds.body.access_token);

    const { genre } = getQuery(event);
    const res = await spotifyApi.getRecommendations({
      seed_genres: genre as string,
      limit: 10,
      market: 'US',
    });

    const recs = res.body.tracks ? formatRes(res.body.tracks) : [];

    return {
      recs,
    };
  } catch (e) {
    return e.body;
  }
});

const formatRes = (
  tracks: SpotifyApi.RecommendationTrackObject[]
): SearchResult[] => {
  return tracks.map((track) => {
    const artists: Artist[] = track.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      url: artist.external_urls.spotify,
    }));

    return {
      id: track.id,
      name: track.name,
      url: track.external_urls.spotify,
      preview_url: track.preview_url,
      album: {
        name: track.album.name,
        url: track.album.external_urls.spotify,
        image: track.album.images[1].url,
      },
      artists,
    };
  });
};
