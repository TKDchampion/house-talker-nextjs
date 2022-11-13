import Box from "../components/box";
import { getLayout } from "../components/layout";

const ArticleEditor = () => {
  return (
    <Box>
      <form>
        <div className="mb-3">
          <label className="form-label">標題</label>
          <input
            type="text"
            className="form-control"
            // formControlName="title"
            // [ngclassName]="{ error: !!articleForm.get('title')?.errors }"
          />
          <div className="form-text">標題不能超過12個字。</div>
        </div>
        <div className="mb-3">
          <label className="form-label">摘要</label>
          <input
            type="text"
            className="form-control"
            // formControlName="summaryContent"
            // [ngclassName]="{ error: !!articleForm.get('summaryContent')?.errors }"
          />
          <div className="form-text">
            摘要必須至少12個字，但不能超過30個字。
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">地理位置</label>
          <div className="d-flex">
            <select
              className="form-select"
              //   formControlName="cityName"
              //   [ngclassName]="{ error: !!articleForm.get('cityName')?.errors }"
              //   (change)="changeCity($event)"
            >
              <option value="" disabled={true}>
                城市
              </option>
              {/* <option *ngFor="let item of city" [value]="item.name">
            {{ item.name }}
          </option> */}
            </select>
            <select
              className="form-select"
              //   formControlName="districts"
              //   [ngclassName]="{ error: !!articleForm.get('districts')?.errors }"
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
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">提示</label>
          <input
            type="text"
            className="form-control"
            // formControlName="tips"
            // [ngclassName]="{ error: !!articleForm.get('tips')?.errors }"
          />
          <div className="form-text">
            可輸入一些關鍵字來暗示，例如可以輸入學校、仲介、Ｘ先生或更詳細地址等...。
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">內容</label>
          {/* <quill-editor
        [modules]="modules"
        formControlName="content"
        [ngclassName]="{ errorContent: !!articleForm.get('content')?.errors }"
        (onEditorCreated)="getEditorInstance($event)"
        [preserveWhitespace]="true"
      ></quill-editor> */}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            // formControlName="isHiddenName"
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
