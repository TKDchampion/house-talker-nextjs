import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { storageGet } from "../../../../core/storage";
import { getArticleForUserService } from "../../../../services/article";
import { ArticleInfo } from "../../../../services/article/model";
import Dialogue from "../../../dialogue";
import ListItem from "../../../list-item";
import SpinnerCommon from "../../../spinner";

interface Props {
  isOpenPopupProfile: boolean;
  setIsOpenPopupProfile:
    | React.Dispatch<React.SetStateAction<boolean>>
    | React.Dispatch<boolean>;
}

const ProfileModal: React.FC<Props> = ({
  isOpenPopupProfile,
  setIsOpenPopupProfile,
}) => {
  // hooks
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const [articleList, setArticleList] = useState<ArticleInfo[]>([]);
  const router = useRouter();

  const getArticleForUser = () => {
    setIsOpenSpinner(true);
    getArticleForUserService().then(
      (resp) => {
        const articlesList = resp as ArticleInfo[];
        articlesList.sort((a, b) => (a.timeTw > b.timeTw ? -1 : 1));
        setArticleList(articlesList);
        setIsOpenSpinner(false);
      },
      (error) => {
        setIsOpenSpinner(false);
      }
    );
  };

  const createArticle = () => {
    router.push("article-editor");
    setIsOpenPopupProfile(false);
  };

  useEffect(() => {
    isOpenPopupProfile && getArticleForUser();
  }, [isOpenPopupProfile]);

  return (
    <>
      {isOpenSpinner && <SpinnerCommon />}
      <Dialogue
        isOpen={isOpenPopupProfile}
        setStatus={setIsOpenPopupProfile}
        title="個人資料"
      >
        <div className="profile-box">
          <div className="profile-box-messages">
            <div className="profile-box-messages-item">
              <span>信箱 : {storageGet("email")}</span>
            </div>
            <div className="profile-box-messages-item">
              <span>暱稱 : {storageGet("nickName")}</span>
            </div>
            <div className="profile-box-messages-item d-flex justify-content-between flex-wrap">
              <span>總文章數 : {articleList.length}</span>
              <button
                type="button"
                className="btn btn-info btn-sm"
                onClick={createArticle}
              >
                新增文章
              </button>
            </div>
            <div></div>
          </div>
          {articleList?.map((item) => {
            return <ListItem setting={item} key={item.id} isControlBtn />;
          })}
          <div className="profile-box-articles"></div>
        </div>
      </Dialogue>
    </>
  );
};

export default ProfileModal;
