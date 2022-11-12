export const API_URL = {
    // Auth
    login: () => "auth/login",
    signup: () => "auth/singup",

    // Article
    getAllNewsArticles: () => 'article/getAllNews',
    getArticleDetail: (id: number) => `article/getDetailById/${id}`,
    getArticleForUser: () => 'article/getByUser',
    createArticle: () => 'article/create',
    updateArticle: (id: number) => `article/update/${id}`,
    deleteArticle: (id: number) => `article/delete/${id}`
}