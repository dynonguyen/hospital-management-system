import axiosClient from './axiosClient';

const URL = '/login';

const loginApi = {
  postLogin: (username, password) => {
    return axiosClient.post(URL, { username, password });
  },
};

export default loginApi;
