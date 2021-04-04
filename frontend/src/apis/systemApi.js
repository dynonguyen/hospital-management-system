import axiosClient from './axiosClient';

const URL = '/system';

const systemApi = {
  getStatisticDash: () => {
    return axiosClient.get(`${URL}/dash`);
  },
};

export default systemApi;
