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
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  const { allNewsArticlesResp } = useAllNewsArticles();
  const [listData, setListData] = useState<ArticleInfo[]>();
  const [defalutArticlesList, setDefalutArticlesList] =
    useState<ArticleInfo[]>();
  const [filterText, setFilterText] = useState("");
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
      setDefalutArticlesList(articlesList);
    }
  }, [allNewsArticlesResp.data?.data, allNewsArticlesResp.isSuccess]);

  useEffect(() => {
    const cityDistrict = cityData.find(
      (i) => i.name === selectedCity
    )?.districts;
    setDistrictList(cityDistrict ? cityDistrict : []);
    setSelectedDistrict("地區");
  }, [selectedCity]);

  const filterFtn = () => {
    switch (!!defalutArticlesList) {
      case selectedCity === "城市":
        setListData(
          defalutArticlesList?.filter(
            (i: ArticleInfo) =>
              i.nickName.includes(filterText) ||
              i.tips.includes(filterText) ||
              i.title.includes(filterText)
          )
        );
        break;
      case selectedDistrict === "地區" && selectedCity !== "城市":
        setListData(
          defalutArticlesList?.filter(
            (i: ArticleInfo) =>
              i.location.includes(selectedCity) &&
              (i.nickName.includes(filterText) ||
                i.tips.includes(filterText) ||
                i.title.includes(filterText))
          )
        );
        break;

      default:
        setListData(
          defalutArticlesList?.filter(
            (i: ArticleInfo) =>
              i.location.includes(selectedCity) &&
              i.location.includes(selectedDistrict) &&
              (i.nickName.includes(filterText) ||
                i.tips.includes(filterText) ||
                i.title.includes(filterText))
          )
        );
        break;
    }
  };

  const clean = () => {
    setSelectedCity("城市");
    setSelectedDistrict("地區");
    setFilterText("");
    setListData(defalutArticlesList);
  };

  return (
    <>
      <Head>
        <title>HouseTalker</title>
        <meta
          name="description"
          content="這是一個專門收集惡房東或有關租屋踩雷新聞的平台，讓有租房需求的人免於成為受害者，改善租屋大環境，使社會變得佳和諧。"
        />
      </Head>
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
                              <Dropdown.Item
                                key={item.name}
                                eventKey={item.name}
                              >
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
                              <Dropdown.Item
                                key={item.name}
                                eventKey={item.name}
                              >
                                {item.name}
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={clean}
                      >
                        清除篩選
                      </button>
                    </div>
                  </div>
                  <div>
                    <input
                      className="input-search"
                      type="text"
                      placeholder="可用暱稱、文章提示、文章標題來搜尋"
                      onChange={(e) => setFilterText(e.target.value)}
                      value={filterText}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={filterFtn}
                  >
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
    </>
  );
};

Home.getLayout = getLayout;
export default Home;
