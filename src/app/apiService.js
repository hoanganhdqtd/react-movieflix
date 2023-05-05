import { BASE_URL, TMDB_KEY, TMDB_BASE_URL } from "./config";
import axios from "axios";

const apiService = axios.create({
  baseURL: TMDB_BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export const get = async (endpoint, params) => {
  try {
    const response = await apiService.get(`${endpoint}?${params}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getURL = (endpoint, params) => {
//   const queryString = new URLSearchParams(params);
//   return `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_KEY}&${queryString}`;
// };

// export const tmdbEndpoints = {
//   mediaList: ({ mediaType, mediaCategory, page }) =>
//     getURL(`${mediaType}/${mediaCategory}`, page),
//   mediaDetail: ({ mediaType, mediaId, page }) =>
//     getURL(`${mediaType}/${mediaId}`, page),
//   mediaGenres: ({ mediaType }) => getURL(`genre/${mediaType}/list`),
//   mediaCredits: ({ mediaType, mediaId }) =>
//     getURL(`${mediaType}/${mediaId}/credits`),
//   mediaVideos: ({ mediaType, mediaId }) =>
//     getURL(`${mediaType}/${mediaId}/videos`),
//   mediaRecommend: ({ mediaType, mediaId }) =>
//     getURL(`${mediaType}/${mediaId}/recommendations`),
//   mediaImages: ({ mediaType, mediaId }) =>
//     getURL(`${mediaType}/${mediaId}/images`),
//   mediaSearch: ({ mediaType, query, page }) =>
//     getURL(`search/${mediaType}`, { query, page }),
//   personDetail: ({ personId }) => getURL(`person/${personId}`),
//   personMedias: ({ personId }) => getURL(`person/${personId}/combined_credits`),
// };

// const tmdbApi = {
//   mediaList: async ({ mediaType, mediaCategory, page }) =>
//     axios.create(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })),
//   mediaDetail: async ({ mediaType, page }) =>
//     axios.create(tmdbEndpoints.mediaDetail({ mediaType, page })),
//   mediaGenres: async ({ mediaType }) =>
//     axios.create(tmdbEndpoints.mediaGenres({ mediaType })),
//   mediaCredits: async ({ mediaType, mediaId }) =>
//     axios.create(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
//   mediaVideos: async ({ mediaType, mediaId }) =>
//     axios.create(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
//   mediaImages: async ({ mediaType, mediaId }) =>
//     axios.create(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
//   mediaRecommend: async ({ mediaType, mediaId }) =>
//     axios.create(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
//   mediaSearch: async ({ mediaType, query, page }) =>
//     axios.create(tmdbEndpoints.mediaSearch({ mediaType, query, page })),
//   personDetail: async ({ personId }) =>
//     axios.create(tmdbEndpoints.personDetail({ personId })),
//   personMedias: async ({ personId }) =>
//     axios.create(tmdbEndpoints.personMedias({ personId })),
// };

export default apiService;
