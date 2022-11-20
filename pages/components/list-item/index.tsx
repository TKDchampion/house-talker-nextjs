import { useRouter } from "next/router";
import React, { useState } from "react";
import { deleteArticleService } from "../../services/article";
import { ArticleInfo } from "../../services/article/model";
import SpinnerCommon from "../spinner";

interface Props {
  setting: ArticleInfo;
  isControlBtn?: boolean;
  onAction?: (type: "Delete" | "Update" | "Detail") => void;
}

const ListItem: React.FC<Props> = ({ setting, isControlBtn, onAction }) => {
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const router = useRouter();

  const goUpdateOrDetail = (pathName: "article-editor" | "article-detail") => {
    router.push(`/${pathName}/${setting?.id}`);
    onAction && onAction(pathName === "article-editor" ? "Update" : "Detail");
  };

  const deleteBtn = (articleId?: string) => {
    if (articleId) {
      setIsOpenSpinner(true);
      deleteArticleService(articleId).then(
        () => {
          setIsOpenSpinner(false);
        },
        () => setIsOpenSpinner(false)
      );
    }
  };

  return (
    <>
      {isOpenSpinner && <SpinnerCommon />}
      <div
        className="list-item-box"
        onClick={() => (isControlBtn ? "" : goUpdateOrDetail("article-detail"))}
      >
        <div className="list-item-box-label">
          {setting?.location} • {setting?.tips}
        </div>
        <h1 className="list-item-box-title">{setting?.title}</h1>
        <div className="list-item-box-content">{setting?.summaryContent}</div>
        <div className="list-item-box-footer d-flex justify-content-between">
          <div>Reply: {setting?.replies}</div>
          <div>
            {setting?.nickName} • {setting?.timeTw}
          </div>
        </div>
        {isControlBtn && (
          <div className="text-end">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => goUpdateOrDetail("article-editor")}
            >
              更新
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteBtn(setting?.id);
                onAction && onAction("Delete");
              }}
            >
              刪除
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListItem;
