import { api } from '@app/client';
import { FastifyError } from '@app/types/rest';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

async function makeRequest<Response = any, Params = any>(
  url: string,
  options?: AxiosRequestConfig<Params>
) {
  try {
    const res: AxiosResponse<Response, Params> = await api(url, options);
    return res.data;
  } catch (err) {
    if (!axios.isAxiosError(err) || !err.response?.data) {
      // DELETE: remove console warn on production mode.
      console.warn(err);
      return Promise.reject(new Error('Internal service error'));
    }
    return Promise.reject(
      new Error((err.response.data as FastifyError).message)
    );
  }
}

export default makeRequest;
