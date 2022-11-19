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

export function useCreateArticle() {
    const CreateArticleFunc = (param: CreateArticleParams) => {
        const config: ApiConfig = {
            url: API_URL.createArticle(),
            body: param
        };
        return baseServices.post(config);
    };

    const CreateArticleResp = useMutationService("CreateArticleKey", CreateArticleFunc);

    return {
        ...CreateArticleResp,
        mutate: CreateArticleResp.mutate as (param: CreateArticleParams) => void,
    };
}
