export const API_URL = {
  // Auth
  login: () => "auth/login",
  signup: () => "auth/singup",
  activate: (token: string) => `auth/activate?token=${token}`,

  // Article
  getAllNewsArticles: () => "article/getAllNews",
  getArticleDetail: (id: string) => `article/getDetailById/${id}`,
  getArticleForUser: () => "article/getByUser",
  createArticle: () => "article/create",
  updateArticle: (id: string) => `article/update/${id}`,
  deleteArticle: (id: string) => `article/delete/${id}`,

  // Message
  getListByArticle: (id: string) => `comment/getListByArticle/${id}`,
  updateMessage: (id: string) => `comment/update/${id}`,
  createMessage: () => "comment/create",
  deleteMessage: (id: string) => `comment/delete/${id}`,
};
