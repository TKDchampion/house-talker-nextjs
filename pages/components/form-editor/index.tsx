import Box from "../box";
import Editor from "../editor";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CreateArticleForm } from "../editor/model";
import { useEffect, useState } from "react";
import { cityData, DistrictModel } from "./model";
import { CreateArticleParams } from "../../services/article/model";
import {
  useCreateArticle,
  useGetArticleDetail,
  useUpdateArticle,
} from "../../services/article/hook";
import SpinnerCommon from "../spinner";
import { useRouter } from "next/router";

interface Props {
  id?: string;
}

const FormEditor = ({ id }: Props) => {
  // hooks
  const [districtArray, setDistrictArray] = useState<DistrictModel[]>([]);
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const router = useRouter();

  // api
  const createArticleResp = useCreateArticle();
  const getArticleDetailResp = useGetArticleDetail();
  const updateArticleResp = useUpdateArticle();

  // statements
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("此欄位必填"),
    summaryContent: Yup.string().required("此欄位必填"),
    cityName: Yup.string().required("此欄位必填"),
    districts: Yup.string().required("此欄位必填"),
    content: Yup.string()
      .required("此欄位必填")
      .test("editorType", "此欄位必填", function (value) {
        return value !== "<p><br></p>";
      }),
    tips: Yup.string().required("此欄位必填"),
    isHiddenName: Yup.bool(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    trigger,
  } = useForm<CreateArticleForm>(formOptions);

  const editorContent = watch("content");

  // functions
  const editorOnChange = (htmlString: string) => {
    setValue("content", htmlString);
    trigger("content");
  };

  const onSubmit = (data: CreateArticleForm) => {
    setIsOpenSpinner(true);
    const createParam: CreateArticleParams = {
      title: data.title,
      content: data.content,
      location: `${data.cityName} ${data.districts}`,
      summaryContent: data.summaryContent,
      tips: data.tips,
      isHiddenName: data.isHiddenName,
    };
    id
      ? updateArticleResp.mutate({ id, body: createParam })
      : createArticleResp.mutate(createParam);
  };

  const onChangeCity = (cityName: string) => {
    const cityDistrict = cityData.find((i) => i.name === cityName)?.districts;
    setDistrictArray(cityDistrict ? cityDistrict : []);
    setInitialValue("");
  };

  // events
  useEffect(() => {
    if (districtArray.length > 0) {
      if (initialValue) {
        setValue("districts", initialValue);
      } else {
        setValue("districts", "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtArray, initialValue]);

  useEffect(() => {
    if (updateArticleResp.isSuccess) {
      setIsOpenSpinner(false);
      router.push("/");
    }
    if (updateArticleResp.isError) {
      setIsOpenSpinner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateArticleResp.isSuccess, updateArticleResp.isError]);

  useEffect(() => {
    if (createArticleResp.isSuccess) {
      setIsOpenSpinner(false);
      router.push("/");
    }
    if (createArticleResp.isError) {
      setIsOpenSpinner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createArticleResp.isSuccess, createArticleResp.isError]);

  useEffect(() => {
    if (id) {
      setIsOpenSpinner(true);
      getArticleDetailResp.mutate(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (getArticleDetailResp.isSuccess) {
      const data = getArticleDetailResp.data?.data;
      const location = data.location.split(" ");
      setValue("title", data.title);
      setValue("summaryContent", data.summaryContent);
      setValue("tips", data.tips);
      setValue("cityName", location[0]);
      setValue("content", data.content);
      setValue("isHiddenName", data.isHiddenName);
      onChangeCity(location[0]);
      setInitialValue(location[1]);
      setIsOpenSpinner(false);
    }
    if (getArticleDetailResp.isError) {
      setIsOpenSpinner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getArticleDetailResp.isSuccess, getArticleDetailResp.isError]);

  return (
    <Box>
      {isOpenSpinner && <SpinnerCommon />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">標題</label>
          <>
            <input
              type="text"
              className={`form-control ${errors.title && "error"}`}
              {...register("title")}
              name="title"
            />
            {errors.title && (
              <div className="error-message">
                {errors.title?.message as string}
              </div>
            )}
          </>
          <div className="form-text">標題不能超過12個字。</div>
        </div>
        <div className="mb-3">
          <label className="form-label">摘要</label>
          <>
            <input
              type="text"
              className={`form-control ${errors.summaryContent && "error"}`}
              {...register("summaryContent")}
              name="summaryContent"
            />
            {errors.summaryContent && (
              <div className="error-message">
                {errors.summaryContent?.message as string}
              </div>
            )}
          </>
          <div className="form-text">
            摘要必須至少12個字，但不能超過30個字。
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">地理位置</label>
          <div className="d-flex">
            <div className="flex-grow-1">
              <select
                className={`form-select ${errors.cityName && "error"}`}
                {...register("cityName")}
                onChange={(event) => onChangeCity(event.target.value)}
              >
                <option value="">城市</option>
                {cityData.map((item) => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {errors.cityName && (
                <div className="error-message">
                  {errors.cityName?.message as string}
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <select
                {...register("districts")}
                className={`form-select ${errors.districts && "error"}`}
              >
                <option value="">地區</option>
                {districtArray.map((districtItem) => {
                  return (
                    <option key={districtItem.name} value={districtItem.name}>
                      {districtItem.name}
                    </option>
                  );
                })}
              </select>
              {errors.districts && (
                <div className="error-message">
                  {errors.districts?.message as string}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">提示</label>
          <>
            <input
              type="text"
              className={`form-control ${errors.tips && "error"}`}
              {...register("tips")}
              name="tips"
            />
            {errors.tips && (
              <div className="error-message">
                {errors.tips?.message as string}
              </div>
            )}
          </>
          <div className="form-text">
            可輸入一些關鍵字來暗示，例如可以輸入學校、仲介、Ｘ先生或更詳細地址等...。
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">內容</label>
          <Editor
            value={editorContent}
            onChange={editorOnChange}
            errorMessage={errors.content?.message as string | undefined}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            {...register("isHiddenName")}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            匿名請打勾
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-3 mb-3">
          送出
        </button>
      </form>
    </Box>
  );
};

export default FormEditor;
