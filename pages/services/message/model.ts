export interface MessagesInfo {
    content: string;
    draftContent: string;
    userId: string;
    timeTw: string;
    id: string;
    nickName: string;
    articleId: number;
    isOwnMessage?: boolean;
    isHiddenName: boolean;
    draftIsHiddenName: boolean;
    [key: string]: unknown;
}

export interface updateMessageParam {
    content: string;
    isHiddenName: boolean;
}

export interface createMessageParam {
    content: string;
    articleId: number;
    isHiddenName: boolean;
}