import Box from "../components/box";
import { getLayout } from "../components/layout";
import Editor from "../components/editor";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CreateArticleForm } from "../components/editor/model";

const ArticleEditor = () => {
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
  } = useForm<any>(formOptions);

  const editorOnChange = (htmlString: string, editorTrigger?: boolean) => {
    setValue("content", htmlString);
    trigger("content");
    console.log(htmlString);

    // editorTrigger && trigger("content");
  };

  const editorContent = watch("content");

  const onSubmit = (data: CreateArticleForm) => {
    console.log(data);
  };

  return (
    <Box>
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
              >
                <option value="" disabled={true}>
                  城市
                </option>
                {/* <option *ngFor="let item of city" [value]="item.name">
            {{ item.name }}
          </option> */}
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
                <option value="" disabled={true}>
                  地區
                </option>
                {/* <option
            *ngFor="let districtItem of districts"
            [value]="districtItem.name"
          >
            {{ districtItem.name }}
          </option> */}
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

ArticleEditor.getLayout = getLayout;

export default ArticleEditor;
