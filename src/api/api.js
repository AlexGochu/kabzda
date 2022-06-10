import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '6e8a74e7-6793-4886-b3b6-fd1ee77de13d'
  }
});


export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
      withCredentials: true
    }).then(response => {return response.data;});
  },
  follow: (userId) => {
    return instance.post(`follow/${userId}`);
  },
  unfollow: (userId) => {
    return instance.delete(`follow/${userId}`);
  },
  getProfile: (userId) => {
    return profileAPI.getProfile(userId);
  }
};

export const profileAPI = {
  getProfile: (userId) => {
    return instance.get(`profile/${userId}`);
  },
  getStatus: (userId) => {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus: (status) => {
    return instance.put(`profile/status`, {status});
  }
};

export const authAPI = {
  me: () => {
    return instance.get(`auth/me`);
  },
  login: (email, password, rememberMe = false) => {
    return instance.post(`auth/login`, {email, password, rememberMe});
  },
  logout: () => {
    return instance.delete(`auth/login`);
  }
};