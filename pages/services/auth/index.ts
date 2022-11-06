import BaseServices from "../../core/base-services";
import { ApiConfig } from "../../core/base-services/model";
import { API_URL } from "../all-url";
import { LoginParam } from "./model";

const baseServices = new BaseServices();

export const loginService = (param: LoginParam) => {
    const config: ApiConfig = {
        url: API_URL.login(),
        body: param
    }

    return baseServices.post(config)
};