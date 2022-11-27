import "../styles/main.scss";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // useEffect(() => {
  //   typeof document !== undefined
  //     ? require("bootstrap/dist/js/bootstrap.bundle.min")
  //     : null;
  // }, []);

  return getLayout(
    <SSRProvider>
      <Head>
        <title>HouseTalker</title>
        <meta name="application-name" content="HouseTalker" />
        <meta
          name="keywords"
          content="house,HouseTalker,rent,租屋,惡房東,房東"
        />
        <meta property="og:site_name" content="HouseTalker" />
        <meta
          property="og:image"
          content="https://www.maxpixel.net/static/photo/1x/House-Illustration-Exterior-Two-Floors-House-House-4921836.jpg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SSRProvider>
  );
}

export default MyApp;
