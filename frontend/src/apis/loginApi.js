import axiosClient from './axiosClient';

const URL = '/login';

const loginApi = {
  postLogin: (username, password) => {
    return axiosClient.post(URL, { username, password });
  },
  postLogout: () => {
    return axiosClient.post(URL + '/logout');
  },
  getUser: () => {
    return axiosClient.get(URL);
  },
};

export default loginApi;
