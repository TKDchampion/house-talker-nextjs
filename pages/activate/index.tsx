import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { activate } from "../services/auth";
import Link from "next/link";

const Activate: FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState({
    title: "無效的連結",
    text: "",
    isSuccess: false,
  });

  const callActivate = (token: string) => {
    activate(token).then(
      () => {
        setMessage({
          title: "驗證成功",
          text: "點選連結到首頁",
          isSuccess: true,
        });
      },
      () => {
        setMessage({
          title: "驗證失敗",
          text: "請通知管理員",
          isSuccess: false,
        });
      }
    );
  };

  useEffect(() => {
    if (token) {
      callActivate(token as string);
    }
  }, [token]);

  return (
    <div className="activate-body">
      <h1 className="text-center">{message.title}</h1>
      <div className="text-center">
        {message.isSuccess ? (
          <div>
            <Link href="/">{message.text}</Link>
          </div>
        ) : (
          <span>{message.text}</span>
        )}
      </div>
    </div>
  );
};

export default Activate;
