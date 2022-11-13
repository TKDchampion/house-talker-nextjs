import BaseServices from "../../core/base-services";
import { ApiConfig } from "../../core/base-services/model";
import { API_URL } from "../all-url";

const baseServices = new BaseServices();

export const getArticleDetail = (id: string) => {
    const config: ApiConfig = {
        url: API_URL.getArticleDetail(id)
    }

    return baseServices.get(config)
};
