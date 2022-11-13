import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Box from "../../components/box";
import { getLayout } from "../../components/layout";
import SpinnerCommon from "../../components/spinner";
import { storageGet } from "../../core/storage";
import { getArticleDetailService } from "../../services/article";
import { ArticleInfo } from "../../services/article/model";
import {
  createMessageService,
  deleteMessageService,
  getListByArticleService,
  updateMessageService,
} from "../../services/message";
import {
  createMessageParam,
  MessagesInfo,
  updateMessageParam,
} from "../../services/message/model";

interface Props {
  data: ArticleInfo;
  messages: MessagesInfo[];
  id: string;
}

const ArticleDetail: any = ({ data, messages, id }: Props) => {
  const [inputMessage, setInputMessage] = useState("");
  const [checkboxHiddenName, setCheckboxHiddenName] = useState(false);
  const [messagesData, setMessagesData] = useState<MessagesInfo[]>([]);
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const userId = storageGet("userId");

  // Functions
  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputMessage(event.target.value);
  };

  const handleMessageItemChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const messagesCoype: MessagesInfo[] = JSON.parse(
      JSON.stringify(messagesData)
    );
    messagesCoype[index].draftContent = event.target.value;
    setMessagesData(messagesCoype);
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxHiddenName(event.target.checked);
  };

  const handleCheckItemChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const messagesCoype: MessagesInfo[] = JSON.parse(
      JSON.stringify(messagesData)
    );
    messagesCoype[index].draftIsHiddenName = event.target.checked;
    setMessagesData(messagesCoype);
  };

  const updataMessage = (index: number) => {
    const messagesCoype: MessagesInfo[] = JSON.parse(
      JSON.stringify(messagesData)
    );
    const item = messagesCoype[index];
    if (item.openState) {
      if (
        item.content !== item.draftContent ||
        item.isHiddenName !== item.draftIsHiddenName
      ) {
        setIsOpenSpinner(true);
        const param: updateMessageParam = {
          content: item.draftContent,
          isHiddenName: item.draftIsHiddenName,
        };
        updateMessageService(item.id, param).then(
          () => {
            messagesCoype[index].openState = false;
            getMessageList();
          },
          () => setIsOpenSpinner(false)
        );
      }
    } else {
      messagesCoype[index].openState = true;
    }
    setMessagesData(messagesCoype);
  };

  const cancelMessage = (index: number) => {
    const messagesCoype: MessagesInfo[] = JSON.parse(
      JSON.stringify(messagesData)
    );
    messagesCoype[index].openState = false;
    setMessagesData(messagesCoype);
  };

  const getMessageList = async () => {
    const messages = (await getListByArticleService(
      id as string
    )) as MessagesInfo[];
    formatterMessages(messages);
  };

  const formatterMessages = (messages: MessagesInfo[]) => {
    if (messages) {
      messages.sort((a, b) => (a.timeTw > b.timeTw ? -1 : 1));
      const newMessages = messages.map((i) => ({
        ...i,
        isOwnMessage: i.userId === userId,
        draftContent: i.content,
        draftIsHiddenName: i.isHiddenName,
      }));
      setIsOpenSpinner(false);
      setMessagesData(newMessages);
    }
  };

  const createMessage = () => {
    const param: createMessageParam = {
      content: inputMessage,
      articleId: parseInt(id),
      isHiddenName: checkboxHiddenName,
    };
    setIsOpenSpinner(true);
    createMessageService(param).then(
      () => {
        setInputMessage("");
        setCheckboxHiddenName(false);
        getMessageList();
      },
      () => {
        setIsOpenSpinner(false);
      }
    );
  };

  const deleteMessage = (item: MessagesInfo) => {
    setIsOpenSpinner(true);
    deleteMessageService(item.id).then(
      () => {
        getMessageList();
      },
      () => setIsOpenSpinner(false)
    );
  };

  useEffect(() => {
    formatterMessages(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Box>
      {isOpenSpinner && <SpinnerCommon />}
      <div className="article-box">
        <div className="d-flex justify-content-between flex-wrap">
          <h1>{data?.title}</h1>
          <div>
            {data?.nickName} • {data?.timeTw}
          </div>
        </div>
        <div className="tips">
          {data?.location} • {data?.tips}
        </div>
        <div className="subtitle">{data?.summaryContent}</div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>

        <div className="reply">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={inputMessage}
            onChange={handleMessageChange}
          ></textarea>
          <button
            type="button"
            className="btn btn-success"
            onClick={createMessage}
            disabled={!inputMessage}
          >
            留言
          </button>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="isHiddenName"
            name="isHiddenName"
            checked={checkboxHiddenName}
            onChange={handleCheckChange}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            匿名請打勾
          </label>
        </div>
      </div>

      <div className="messages">
        {messagesData.map((item: MessagesInfo, index) => {
          return (
            <div
              key={item.id}
              className={`speech-bubble-${
                item.isOwnMessage ? "right" : "left"
              }`}
            >
              {item.openState ? (
                <div>
                  <textarea
                    id=""
                    cols={30}
                    rows={10}
                    value={item.draftContent}
                    onChange={(event) => handleMessageItemChange(event, index)}
                  ></textarea>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isHiddenName"
                      name="isHiddenName"
                      checked={item.draftIsHiddenName}
                      onChange={(event) => handleCheckItemChange(event, index)}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                      匿名請打勾
                    </label>
                  </div>
                </div>
              ) : (
                <div className="message-item">{item.content}</div>
              )}
              <div className="text-end me-3">
                {item.isOwnMessage && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => updataMessage(index)}
                    >
                      {item.openState ? "更新" : "編輯"}
                    </button>
                    <>
                      {item.openState && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => cancelMessage(index)}
                        >
                          取消
                        </button>
                      )}
                    </>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteMessage(item)}
                    >
                      刪除
                    </button>
                  </div>
                )}
                <div>
                  {item.nickName} • {item.timeTw}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

ArticleDetail.getLayout = getLayout;

export default ArticleDetail;

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const data = (await getArticleDetailService(id as string)) as ArticleInfo;
  const messages = (await getListByArticleService(
    id as string
  )) as MessagesInfo[];

  if (messages) {
    messages.sort((a, b) => (a.timeTw > b.timeTw ? -1 : 1));
  }

  return { props: { data, messages, id } };
};
