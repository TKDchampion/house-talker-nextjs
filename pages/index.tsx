import Accordion from "./components/accordion";
import Box from "./components/box";
import { getLayout } from "./components/layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div className="row">
      <div className="col-xl-4">
        <div className="row">
          <div className="col-12">
            <Box>
              <div>
                <div className="d-flex justify-content-between flex-wrap">
                  <div>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                      >
                        {"123"} <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item">{"123"}</a>
                        </li>
                      </ul>
                    </div>
                    <div className="btn-group ms-2">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                      >
                        {"456"} <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item">{"456"}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      清除篩選
                    </button>
                  </div>
                </div>
                <div>
                  <input
                    className="input-search"
                    type="text"
                    placeholder="可用暱稱、文章提示、文章標題來搜尋"
                  />
                </div>
                <button type="button" className="btn btn-primary w-100">
                  搜尋
                </button>
              </div>
            </Box>
          </div>
          <div className="col-12">
            <Box>
              <Accordion />
            </Box>
          </div>
        </div>
      </div>
      <div className="col-xl-8 article-list">
        <Box>
          {/* <app-list-item
        *ngFor="let item of articlesList"
        [setting]="item"
      ></app-list-item> */}
        </Box>
      </div>
    </div>
  );
};

Home.getLayout = getLayout;
export default Home;
