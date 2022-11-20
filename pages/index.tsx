import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Accordion from "./components/accordion";
import Box from "./components/box";
import { cityData, DistrictModel } from "./components/form-editor/model";
import { getLayout } from "./components/layout";
import ListItem from "./components/list-item";
import SpinnerCommon from "./components/spinner";
import { useAllNewsArticles } from "./services/article/hook";
import { ArticleInfo } from "./services/article/model";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { allNewsArticlesResp } = useAllNewsArticles();
  const [listData, setListData] = useState<ArticleInfo[]>();
  const [selectedCity, setSelectedCity] = useState("城市");
  const [selectedDistrict, setSelectedDistrict] = useState("地區");
  const [districtList, setDistrictList] = useState<DistrictModel[]>([]);

  useEffect(() => {
    if (allNewsArticlesResp.isSuccess) {
      const articlesList: ArticleInfo[] = JSON.parse(
        JSON.stringify(allNewsArticlesResp.data?.data)
      );
      articlesList.sort((a, b) => (a.timeTw > b.timeTw ? -1 : 1));
      setListData(articlesList);
    }
  }, [allNewsArticlesResp.data?.data, allNewsArticlesResp.isSuccess]);

  useEffect(() => {
    const cityDistrict = cityData.find(
      (i) => i.name === selectedCity
    )?.districts;
    setDistrictList(cityDistrict ? cityDistrict : []);
    setSelectedDistrict("地區");
  }, [selectedCity]);

  return (
    <div className="row">
      {(allNewsArticlesResp.isLoading || allNewsArticlesResp.isFetching) && (
        <SpinnerCommon />
      )}
      <div className="col-xl-4">
        <div className="row">
          <div className="col-12">
            <Box>
              <div>
                <div className="d-flex justify-content-between flex-wrap">
                  <div>
                    <div className="btn-group">
                      <DropdownButton
                        as={ButtonGroup}
                        key={"Primary"}
                        id={`dropdown-variants-Primary`}
                        variant={"primary"}
                        title={selectedCity}
                        onSelect={(e) => setSelectedCity(e as string)}
                      >
                        <Dropdown.Item key="城市" eventKey="城市">
                          城市
                        </Dropdown.Item>
                        {cityData.map((item) => {
                          return (
                            <Dropdown.Item key={item.name} eventKey={item.name}>
                              {item.name}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </div>
                    <div className="btn-group ms-2">
                      <DropdownButton
                        as={ButtonGroup}
                        key={"Primary"}
                        id={`dropdown-variants-Primary`}
                        variant={"primary"}
                        title={selectedDistrict}
                        onSelect={(e) => setSelectedDistrict(e as string)}
                      >
                        <Dropdown.Item key="地區" eventKey="地區">
                          地區
                        </Dropdown.Item>
                        {districtList.map((item) => {
                          return (
                            <Dropdown.Item key={item.name} eventKey={item.name}>
                              {item.name}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
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
          {listData?.map((item) => {
            return <ListItem setting={item} key={item.id} />;
          })}
        </Box>
      </div>
    </div>
  );
};

Home.getLayout = getLayout;
export default Home;
