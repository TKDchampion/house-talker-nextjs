import Link from "next/link";
import { FC } from "react";

interface Props {
  children?: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      {/* Navbar Start */}
      <nav>
        <div>
          <div>
            <Link href="/">
              <a>HOME</a>
            </Link>
            <Link href="/info">
              <a>INFO</a>
            </Link>
            <Link href="/about/1">
              <a>ABOUT</a>
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar End */}

      {children}

      {/* Footer Start */}
      <div>FOOTER</div>
      {/* Footer End */}
    </div>
  );
};

export default Layout;

export const getLayout = (page: any) => <Layout>{page}</Layout>;
