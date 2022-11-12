import React from "react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storageSet } from "../../../../core/storage";
import { LoginInfo, LoginParam } from "../../../../services/auth/model";
import { loginService } from "../../../../services/auth";
import Dialogue from "../../../dialogue";
import SpinnerCommon from "../../../spinner";

interface Props {
  isOpenPopupLogin: boolean;
  setIsOpenPopupLogin:
    | React.Dispatch<React.SetStateAction<boolean>>
    | React.Dispatch<boolean>;
  setIsLogin:
    | React.Dispatch<React.SetStateAction<boolean>>
    | React.Dispatch<boolean>;
}

const LoginModal: React.FC<Props> = ({
  isOpenPopupLogin,
  setIsOpenPopupLogin,
  setIsLogin,
}) => {
  // hooks
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const [respMessages, setRespMessages] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("此欄位必填").email("格式錯誤"),
    password: Yup.string().required("此欄位必填"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginParam>(formOptions);

  // event
  useEffect(() => {
    if (isOpenPopupLogin) {
      setValue("email", "");
      setValue("password", "");
      setRespMessages("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopupLogin]);

  // functions
  const onSubmitLogin: SubmitHandler<LoginParam> = (data) => {
    setIsOpenSpinner(true);
    loginService(data).then(
      (resp: any | LoginInfo) => {
        setPersonal(resp);
        setIsOpenSpinner(false);
        setIsOpenPopupLogin(false);
        setRespMessages("登入成功");
      },
      (error: {
        data: { statusCode: number; message: React.SetStateAction<string> };
      }) => {
        console.log(error);
        setIsOpenSpinner(false);
        setRespMessages(
          error.data.statusCode === 401 ? "帳密錯誤" : error.data.message
        );
      }
    );
  };
  const setPersonal = (info: LoginInfo) => {
    storageSet("access_token", info.access_token as any);
    storageSet("email", info.email as any);
    storageSet("nickName", info.nickName as any);
    storageSet("userId", info.userId as any);
    setIsLogin(true);
  };

  return (
    <>
      {isOpenSpinner && <SpinnerCommon />}
      <Dialogue
        isOpen={isOpenPopupLogin}
        setStatus={setIsOpenPopupLogin}
        title="登入"
      >
        <form className="center" onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="inputbox">
            <div className="center-input">
              <input {...register("email")} type="email" name="email" />
              <span>信箱</span>
            </div>
            <div className="error-message">
              {errors.email ? (errors.email.message as string) : ""}
            </div>
          </div>
          <div className="inputbox">
            <div className="center-input">
              <input
                {...register("password", { required: true })}
                type="text"
                name="password"
              />
              <span>密碼</span>
            </div>
            <div className="error-message">
              {errors.password ? (errors.password.message as string) : ""}
            </div>
          </div>
          <div className="inputbox center-margin">
            <button className="w-100" type="submit">
              送出
            </button>
            <div className="error-message">{respMessages}</div>
          </div>
        </form>
      </Dialogue>
    </>
  );
};

export default LoginModal;
