import BaseServices from "../../core/base-services";
import { ApiConfig } from "../../core/base-services/model";

const baseServices = new BaseServices();

export const getServerSideFakeFtnRromise = (id?: string) => {
    const config: ApiConfig = {
        baseConfig: {
            baseURL: 'https://jsonplaceholder.typicode.com/'
        },
        url: `todos/${id}`,
    }

    return baseServices.get(config)
};