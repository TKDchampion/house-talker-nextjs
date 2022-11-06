import getAxiosInstance from "./get-axios-instance";
import { ApiConfig } from "./model";

export default class BaseServicesHook {
  get = async (apiconfig: ApiConfig) => {
    return await getAxiosInstance(apiconfig).get(apiconfig.url);
  };

  post = async (apiconfig: ApiConfig) => {
    return await getAxiosInstance(apiconfig).post(
      apiconfig.url,
      apiconfig.body
    );
  };

  put = async (apiconfig: ApiConfig) => {
    return await getAxiosInstance(apiconfig).put(
      apiconfig.url,
      apiconfig.body
    );
  };

  patch = async (apiconfig: ApiConfig) => {
    return await getAxiosInstance(apiconfig).patch(
      apiconfig.url,
      apiconfig.body
    );
  };

  delete = async (apiconfig: ApiConfig) => {
    return await getAxiosInstance(apiconfig).delete(apiconfig.url);
  };
}
