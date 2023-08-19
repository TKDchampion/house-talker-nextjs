const fs = require("fs");

export const appendById = (ids: string[]) => {
  const idArray = [];
  let sitemap = '';
  ids.forEach(id => {
    sitemap += `https://house-talker.com/article-detail/${id} \n`;
  })
  fs.writeFileSync("public/sitemap-01.txt", sitemap);
};
