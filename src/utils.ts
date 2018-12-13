import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:8080',
});

export const api = async <T, R extends object = {}>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: R
): Promise<T> => {
  const res = await instance.request({
    data,
    method,
    url,
  });
  return res.data;
};
