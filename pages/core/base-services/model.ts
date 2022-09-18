import { AxiosRequestHeaders } from "axios";

export interface ApiConfig {
  baseConfig?: BaseConfig;
  body?: Record<string, any>;
  url: string;
}

interface BaseConfig {
  headers?: AxiosRequestHeaders;
  baseURL?: string;
}
