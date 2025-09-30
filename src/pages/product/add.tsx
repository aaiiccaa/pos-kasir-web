import { FC } from "react";
import { useRouter } from "next/router";
import ProductForm, { ProductData } from "./ProductForm";
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

const AddProductPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();

  const handleAdd = async (data: ProductData) => {

    try {
      await new AxiosCaller("http://localhost:3001").call["POST /product"]({
        headers: { authorization },
        body: data,
      });
      alert("Product Added");
      router.push("/product");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black p-4">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-xl font-semibold mb-4">Add Product</h1>
        <ProductForm onSubmit={handleAdd} submitLabel="Add Product" authorization={authorization}/>
      </div>
    </div>
  );
};

export default AddProductPage;
