export interface ArticleInfo {
    timeTw: string;
    summaryContent: string;
    location: string;
    id: string;
    userId: string;
    nickName: string;
    tips: string;
    title: string;
    replies: number;
    [key: string]: any;
}

export interface CreateArticleParams {
    content: string;
    location: string;
    summaryContent: string;
    tips: string;
    title: string;
    isHiddenName: boolean;
}

export interface DistrictModel {
    zip: string;
    name: string;
}

export interface CityModel {
    name: string;
    districts: DistrictModel[];
}