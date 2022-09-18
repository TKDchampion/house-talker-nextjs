import { useRouter } from "next/router";
import { getLayout } from "../../components/layout";

const About = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>About: {id}</h1>
    </>
  );
};

About.getLayout = getLayout;

export default About;
