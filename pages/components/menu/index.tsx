import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { storageClear, storageGet, storageHasItem } from "../../core/storage";
import { useRouter } from "next/router";
import LoginModal from "./components-custom/login-modal";

const Menu = () => {
  // hooks
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const router = useRouter();

  // event
  useEffect(() => {
    setIsLogin(storageHasItem("access_token"));
  }, []);

  // functions
  const logout = () => {
    storageClear();
    setIsLogin(false);
    router.push("/");
  };

  return (
    <>
      <nav className="header-bar">
        <div className="d-flex justify-content-between">
          <Link className="logo" href="/">
            HouseTalker
          </Link>
          <div className="d-flex header-menu">
            <div className="header-menu-item">首頁</div>
            {isLogin ? (
              <div className="d-flex">
                <div className="header-menu-item">{storageGet("nickName")}</div>
                <div className="header-menu-item" onClick={() => logout()}>
                  登出
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <div
                  className="header-menu-item"
                  onClick={() => setIsOpenPopupLogin(true)}
                >
                  登入
                </div>
                <div className="header-menu-item">註冊</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        isOpenPopupLogin={isOpenPopupLogin}
        setIsOpenPopupLogin={setIsOpenPopupLogin}
        setIsLogin={setIsLogin}
      />
    </>
  );
};

export default Menu;
