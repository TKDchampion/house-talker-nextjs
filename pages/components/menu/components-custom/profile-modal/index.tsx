import React, { useState } from "react";
import { storageGet } from "../../../../core/storage";
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
              <span>總文章數 : {"{ profile?.count }"}</span>
              <button
                type="button"
                className="btn btn-info btn-sm"
                // (click)="createArticle()"
              >
                新增文章
              </button>
            </div>
            <div></div>
          </div>
          {/* <ListItem></ListItem> */}
          <div className="profile-box-articles"></div>
        </div>
      </Dialogue>
    </>
  );
};

export default ProfileModal;
