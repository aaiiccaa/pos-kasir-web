import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryForm, { CategoryData } from "../CategoryForm";
import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import {
  AuthSSR,
  ErrorSessionNotFound,
  ErrorProfileNotFound,
} from "@/ssr/AuthSSR";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

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

const EditCategoryPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();
  const { id } = router.query;

  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

  const fetchCategory = async () => {

    try {
      const res = await new AxiosCaller("http://localhost:3001").call["GET /category/:id"]({
        headers: { authorization },
        paths: { id: Number(id) },
      });

      setCategoryData({
        name: res.name,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch category");
    }
  };

  const handleEdit = async (data: CategoryData) => {

    try {
      await new AxiosCaller("http://localhost:3001").call["PUT /category/:id"]({
        headers: { authorization },
        paths: { id: Number(id) },
        body: data,
      });
      alert("Category updated");
      router.push("/category");
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    }
  };

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  if (!categoryData) return <div className="p-4 min-h-screen bg-white text-black">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black p-4">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-xl font-semibold mb-4">Edit Category</h1>
        <CategoryForm initialData={categoryData} onSubmit={handleEdit} submitLabel="Update Category" authorization={authorization}/>
      </div>
    </div>
  );
};

export default EditCategoryPage;
