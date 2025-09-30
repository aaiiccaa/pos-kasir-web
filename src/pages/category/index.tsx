import { FC, useEffect, useState } from "react";
import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import { useRouter } from "next/router";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { category } from "@/api-lib/ts-model/table/category";
import { category_response } from "@/api-lib/ts-schema/category_response";
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

const CategoryPage: FC<PageProps> = ({ authorization }) => {
  const router = useRouter();
  const [categories, setCategory] = useState<category_response[]>([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const fetchCategoryData = async () => {
    try {
      const res = await new AxiosCaller("http://localhost:3001").call[
        "GET /category"
      ]({
        headers: { authorization },
        query: {},
      });

      setCategory(res);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await new AxiosCaller("http://localhost:3001").call[
        "DELETE /category/:id"
      ]({
        headers: { authorization },
        paths: { id },
      });

      alert("Product deleted");
      fetchCategoryData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleNext = () => setOffset((prev) => prev + limit);
  const handlePrev = () => setOffset((prev) => Math.max(prev - limit, 0));

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans pt-2">
      <div className="flex flex-1 flex-col mt-2 px-4 max-w-6xl mx-auto gap-4 h-fit">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Category List</h1>
          <button
            className="flex items-center gap-2 bg-cyan-900 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md hover:bg-cyan-700 transition-colors duration-300"
            onClick={() => router.push("/category/add")}
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Add Category</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm table-fixed">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 font-semibold w-12">ID</th>
                <th className="py-3 px-4 font-semibold w-48">Name</th>
                <th className="py-3 px-4 font-semibold w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-4">{category.id}</td>
                  <td className="py-2 px-4">{category.name}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() =>
                        router.push(`/category/edit/${category.id}`)
                      }
                      className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={offset === 0}
            className="text-sm bg-gray-200 px-4 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors duration-200"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="text-sm bg-gray-200 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
