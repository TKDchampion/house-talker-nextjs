import { API_URL } from "./../all-url";
import { ApiConfig } from "../../core/base-services/model";
import BaseServices from "../../core/base-services-hook";
import {
    useMutationService,
    useQueryService,
} from "../../core/base-services-hook/service-hooks/hooks";
import { CreateArticleParams } from "./model";

const baseServices = new BaseServices();

export function useAllNewsArticles() {
    const config: ApiConfig = {
        url: API_URL.getAllNewsArticles()
    };

    const allNewsArticlesFunc = () => {
        return baseServices.get(config);
    };

    const allNewsArticlesResp = useQueryService("allNewsArticlesKey", allNewsArticlesFunc);

    return {
        allNewsArticlesResp,
    };
}

export function useGetArticleDetail() {
    const getArticleDetailFunc = (id: string) => {
        const config: ApiConfig = {
            url: API_URL.getArticleDetail(id)
        };
        return baseServices.get(config);
    };

    const getArticleDetailResp = useMutationService("getArticleDetailKey", getArticleDetailFunc);

    return {
        ...getArticleDetailResp,
        mutate: getArticleDetailResp.mutate as (id: string) => void,
    };
}

export function useCreateArticle() {
    const createArticleFunc = (param: CreateArticleParams) => {
        const config: ApiConfig = {
            url: API_URL.createArticle(),
            body: param
        };
        return baseServices.post(config);
    };

    const createArticleResp = useMutationService("CreateArticleKey", createArticleFunc);

    return {
        ...createArticleResp,
        mutate: createArticleResp.mutate as (param: CreateArticleParams) => void,
    };
}

export function useUpdateArticle() {
    const updateArticleFunc = (param: { body: CreateArticleParams, id: string }) => {
        const config: ApiConfig = {
            url: API_URL.updateArticle(param.id),
            body: param.body
        };
        return baseServices.patch(config);
    };

    const updateArticleResp = useMutationService("updateArticleKey", updateArticleFunc);

    return {
        ...updateArticleResp,
        mutate: updateArticleResp.mutate as (param: { body: CreateArticleParams, id: string }) => void,
    };
}