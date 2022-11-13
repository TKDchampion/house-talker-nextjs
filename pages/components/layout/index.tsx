import { FC } from "react";
import Menu from "../menu";

interface Props {
  children?: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      {/* Navbar Start */}
      <Menu />
      {/* Navbar End */}

      <div className="body">
        <div className="container-lg">{children}</div>
      </div>

      {/* Footer Start */}
      {/* <div>FOOTER</div> */}
      {/* Footer End */}
    </div>
  );
};

export default Layout;

export const getLayout = (page: any) => <Layout>{page}</Layout>;
