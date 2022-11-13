import BaseServices from "../../core/base-services";
import { ApiConfig } from "../../core/base-services/model";
import { API_URL } from "../all-url";

const baseServices = new BaseServices();

export const getArticleDetailService = (id: string) => {
    const config: ApiConfig = {
        url: API_URL.getArticleDetail(id)
    }

    return baseServices.get(config)
};

export const getArticleForUserService = () => {
    const config: ApiConfig = {
        url: API_URL.getArticleForUser()
    }

    return baseServices.get(config)
};