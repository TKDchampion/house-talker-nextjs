import { FC } from "react";
import { getLayout as getBasicLayout } from "../layout";

interface Props {
  children?: React.ReactNode;
}

const ProductsLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div>product layout</div>
      {children}
    </div>
  );
};

export default ProductsLayout;

export const getLayout = (page: any) =>
  getBasicLayout(<ProductsLayout>{page}</ProductsLayout>);
