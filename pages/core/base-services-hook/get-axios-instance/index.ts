import { ApiConfig } from "../model";
import axios, { AxiosInstance } from "axios";
import { storageGet } from "../../storage";
import { StorageKey } from "../../../utils/storage-key";

export default function getAxiosInstance(apiconfig: ApiConfig): AxiosInstance {
  const token = storageGet(StorageKey.token);

  const apiConfig = {
    baseURL: !!apiconfig.baseConfig?.baseURL
      ? apiconfig.baseConfig.baseURL
      : process?.env["NEXT_PUBLIC_URL"],
    headers: !!apiconfig.baseConfig?.headers
      ? apiconfig.baseConfig.headers
      : {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
  };

  return axios.create(apiConfig);
}
