import { useRouter } from "next/router";
import FormEditor from "../../components/form-editor";
import { getLayout } from "../../components/layout";

const ArticleEditor = () => {
  const router = useRouter();
  const { id } = router.query;

  return <FormEditor id={id as string} />;
};

ArticleEditor.getLayout = getLayout;

export default ArticleEditor;
