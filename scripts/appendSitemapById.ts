const fs = require("fs");

export const appendById = (id: any = 0) => {
  const sitemap = `https://house-talker.com/article-detail/${id} \n`;
  fs.appendFileSync("public/sitemap-01.txt", sitemap);
};
