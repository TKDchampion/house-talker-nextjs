import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { getLayout } from "../../components/layout";
import { getServerSideFakeFtnRromise } from "../../services/fake";

const Info: any = (props: any) => {
  const [data, setData] = useState<any>({});

  return (
    <div>
      INFO
      <div>
        <button
          onClick={() => {
            try {
              getServerSideFakeFtnRromise(props.id).then(
                (resp) => {
                  console.log(resp);
                  setData(resp);
                },
                (err) => console.log(err)
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          CSR api call
        </button>
        {data.id}
        {data.title}
      </div>
      <h1>
        {props.dataSSR?.id}
        {props.dataSSR?.title}
      </h1>
    </div>
  );
};

Info.getLayout = getLayout;

export default Info;

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const dataSSR = await getServerSideFakeFtnRromise(id as string);

  return { props: { dataSSR, id } };
};
