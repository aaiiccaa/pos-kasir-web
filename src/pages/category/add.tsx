import { FC } from "react";
import { useRouter } from "next/router";
import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import {
  AuthSSR,
  ErrorSessionNotFound,
  ErrorProfileNotFound,
} from "@/ssr/AuthSSR";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import CategoryForm, { CategoryData } from "./CategoryForm";
import { base_url } from "@/util/util";

interface PageProps {
  authorization: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps>> {
  try {
    const auth_ssr_result = await AuthSSR(context);

    return {
      props: {
        authorization: auth_ssr_result.authorization,
      },
    };
  } catch (err: any) {
    if (
      err instanceof ErrorSessionNotFound ||
      err instanceof ErrorProfileNotFound
    ) {
      return {
        redirect: {
          destination: "/api/logout",
          permanent: false,
        },
      };
    }
  }

  throw new Error(`Unexpected error`);
}

const AddCategoryPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();

  const handleAdd = async (data: CategoryData) => {

    try {
      await new AxiosCaller(base_url).call["POST /category"]({
        headers: { authorization },
        body: data,
      });
      alert("Category Added");
      router.push("/category");
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black p-4">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-xl font-semibold mb-4">Add Category</h1>
        <CategoryForm onSubmit={handleAdd} submitLabel="Add Category" authorization={authorization}/>
      </div>
    </div>
  );
};

export default AddCategoryPage;
