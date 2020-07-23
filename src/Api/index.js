import api, { BASE_URL } from "./axios";

const Api = {
  signup: (body) => {
    return api.post(`${BASE_URL}/auth/signup`, body);
  },

  login: (body) => {
    return api.post(`${BASE_URL}/auth/login`, body);
  },

  loadUser: () => {
    return api.get(`${BASE_URL}/user`);
  },

  logout: () => {
    return api.delete(`${BASE_URL}/auth/logout`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
  },

  loadMovies: (search) => {
    return api.get(`${BASE_URL}/movies`, { params: search });
  },

  loadMovieById: (id) => {
    return api.get(`${BASE_URL}/movies/${id}`);
  },

  loadReviewsByMovieId: (id) => {
    return api.get(`${BASE_URL}/reviews/movie/${id}`);
  },
};

export default Api;
