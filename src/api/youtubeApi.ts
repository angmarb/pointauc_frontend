import { VideoSnippet } from '../models/youtube';

export const searchYoutubeVideos = async (query: string, keyId = 0): Promise<VideoSnippet[]> => {
  return [];
  // try {
  //   if (!YOUTUBE_API_KEYS[keyId]) {
  //     return [];
  //   }
  //
  //   const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
  //     params: {
  //       q: query,
  //       part: 'snippet',
  //       type: 'video',
  //       maxResults: 10,
  //       key: YOUTUBE_API_KEYS[keyId],
  //     },
  //   });
  //
  //   return data.items;
  // } catch (e) {
  //   return searchYoutubeVideos(query, keyId + 1);
  // }
};
