import axiosClient from './axiosClient';

const URL = '/system';

const systemApi = {
  getStatisticDash: () => {
    return axiosClient.get(`${URL}/dash`);
  },

  getUserList: () => {
    return axiosClient.get(`${URL}/user-list`);
  },

  getDetailUser: (userId) => {
    return axiosClient.get(`${URL}/user`, { params: { userId } });
  },
};

export default systemApi;
