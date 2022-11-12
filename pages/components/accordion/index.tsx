import React from "react";
import { Data } from "./model";

const Accordion: React.FC = () => {
  return (
    <div className="accordion">
      {Data.map((item) => {
        return (
          <div className="accordion-item" key={item.title}>
            <h2 className="accordion-header">
              <button className="accordion-button" type="button">
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
