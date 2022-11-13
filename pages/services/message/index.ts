import BaseServices from "../../core/base-services";
import { ApiConfig } from "../../core/base-services/model";
import { API_URL } from "../all-url";
import { createMessageParam, updateMessageParam } from "./model";

const baseServices = new BaseServices();

export const getListByArticleService = (id: string) => {
    const config: ApiConfig = {
        url: API_URL.getListByArticle(id)
    }

    return baseServices.get(config)
};

export const updateMessageService = (id: string, param: updateMessageParam) => {
    const config: ApiConfig = {
        url: API_URL.updateMessage(id),
        body: param,
    }

    return baseServices.patch(config)
}

export const createMessageService = (param: createMessageParam) => {
    const config: ApiConfig = {
        url: API_URL.createMessage(),
        body: param,
    }

    return baseServices.post(config)
}

export const deleteMessageService = (id: string) => {
    const config: ApiConfig = {
        url: API_URL.deleteMessage(id)
    }

    return baseServices.delete(config)
};