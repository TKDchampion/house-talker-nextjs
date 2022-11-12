import React, { useState } from "react";
import { Data } from "./model";

const Accordion: React.FC = () => {
  const [data, setData] = useState(Data);

  const changeData = (index: number) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy[index].show = !data[index].show;
    setData(dataCopy);
  };

  return (
    <div className="accordion">
      {data.map((item, index) => {
        return (
          <div className="accordion-item" key={item.title}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                onClick={() => changeData(index)}
              >
                {item.title}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${item.show && "show"}`}
            >
              <div className="accordion-body">
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
