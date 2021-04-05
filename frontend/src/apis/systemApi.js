import axiosClient from './axiosClient';

const URL = '/system';

const systemApi = {
  getStatisticDash: () => {
    return axiosClient.get(`${URL}/dash`);
  },

  getUserList: () => {
    return axiosClient.get(`${URL}/user-list`);
  },
};

export default systemApi;
