import React from "react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SingParam } from "../../../../services/auth/model";
import { signupService } from "../../../../services/auth";
import Dialogue from "../../../dialogue";
import SpinnerCommon from "../../../spinner";

interface Props {
  isOpenPopupSignup: boolean;
  setIsOpenPopupSignup:
    | React.Dispatch<React.SetStateAction<boolean>>
    | React.Dispatch<boolean>;
}

const SignupModal: React.FC<Props> = ({
  isOpenPopupSignup,
  setIsOpenPopupSignup,
}) => {
  // hooks
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const [respMessages, setRespMessages] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("此欄位必填").email("格式錯誤"),
    password: Yup.string().required("此欄位必填"),
    nickName: Yup.string().required("此欄位必填"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SingParam>(formOptions);

  // event
  useEffect(() => {
    if (isOpenPopupSignup) {
      setValue("email", "");
      setValue("password", "");
      setValue("nickName", "");
      setRespMessages("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopupSignup]);

  // functions
  const onSubmitLogin: SubmitHandler<SingParam> = (data) => {
    setIsOpenSpinner(true);
    signupService(data).then(
      () => {
        setIsOpenSpinner(false);
        setIsOpenPopupSignup(false);
        setRespMessages("註冊成功，請到信箱啟用連結。");
      },
      (error) => {
        console.log(error);
        setIsOpenSpinner(false);
        setRespMessages(
          error.data.statusCode === 403 ? error.data.message : "註冊失敗"
        );
        setValue("password", "");
        setValue("nickName", "");
      }
    );
  };

  return (
    <>
      {isOpenSpinner && <SpinnerCommon />}
      <Dialogue
        isOpen={isOpenPopupSignup}
        setStatus={setIsOpenPopupSignup}
        title="註冊"
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
          <div className="inputbox">
            <div className="center-input">
              <input
                {...register("nickName", { required: true })}
                type="text"
                name="nickName"
              />
              <span>暱稱</span>
            </div>
            <div className="error-message">
              {errors.nickName ? (errors.nickName.message as string) : ""}
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

export default SignupModal;
