import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductForm, { ProductData } from "../ProductForm";
import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import {
  AuthSSR,
  ErrorSessionNotFound,
  ErrorProfileNotFound,
} from "@/ssr/AuthSSR";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
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

const EditProductPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();
  const { id } = router.query;

  const [productData, setProductData] = useState<ProductData | null>(null);

  const fetchProduct = async () => {

    try {
      const res = await new AxiosCaller(base_url).call["GET /product/:id"]({
        headers: { authorization },
        paths: { id: Number(id) },
      });

      setProductData({
        name: res.name,
        price: res.price,
        stock: res.stock,
        category_id: res.category_id,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch product");
    }
  };

  const handleEdit = async (data: ProductData) => {
    const token = localStorage.getItem("access_token");
    if (!token || !id) return router.push("/login");

    try {
      await new AxiosCaller(base_url).call["PUT /product/:id"]({
        headers: { authorization: token },
        paths: { id: Number(id) },
        body: data,
      });
      alert("Product updated");
      router.push("/product");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (!productData) return <div className="p-4 min-h-screen bg-white text-black">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black p-4">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
        <ProductForm initialData={productData} onSubmit={handleEdit} submitLabel="Update Product" authorization={authorization}/>
      </div>
    </div>
  );
};

export default EditProductPage;
