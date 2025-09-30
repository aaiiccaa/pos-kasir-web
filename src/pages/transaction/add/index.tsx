import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import { product } from "@/api-lib/ts-model/table/product";
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

interface TransactionItem {
  product_id: number;
  qty: number;
}

const AddTransactionPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();

  const [products, setProducts] = useState<product[]>([]);
  const [items, setItems] = useState<TransactionItem[]>([
    { product_id: 0, qty: 1 },
  ]);

  const fetchProducts = async () => {

    try {
      const res = await new AxiosCaller(base_url).call[
        "GET /products"
      ]({
        headers: { authorization },
        query: { limit: 100, offset: 0 },
      });

      setProducts(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { product_id: 0, qty: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleItemChange = (
    index: number,
    field: "product_id" | "qty",
    value: number
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const getSummaryItems = () => {
    return items
      .filter((item) => item.product_id !== 0)
      .map((item) => {
        const productData = products.find((p) => p.id === item.product_id);
        const price = productData?.price ?? 0;
        const name = productData?.name ?? "Unknown";
        const subtotal = price * item.qty;

        return {
          name,
          qty: item.qty,
          price,
          subtotal,
        };
      });
  };

  const getTotal = () => {
    return getSummaryItems().reduce((acc, item) => acc + item.subtotal, 0);
  };

  const submitTransaction = async () => {
    if (!confirm("Are you sure you want to submit this transaction?")) return;

    try {
      await new AxiosCaller(base_url).call["POST /transaction"]({
        headers: { authorization },
        body: { data: items },
      });

      alert("Transaction added successfully!");
      setItems([{ product_id: 0, qty: 1 }]);
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 text-black">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Add Transaction</h1>

        {items.map((item, index) => (
          <div key={index} className="mb-4 flex gap-2 items-center">
            <select
              value={item.product_id}
              onChange={(e) =>
                handleItemChange(index, "product_id", parseInt(e.target.value))
              }
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value={0} disabled>
                Select product
              </option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              value={item.qty}
              onChange={(e) =>
                handleItemChange(index, "qty", parseInt(e.target.value))
              }
              className="w-24 border border-gray-300 p-2 rounded"
            />

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={handleAddItem}
            className="mb-4 text-cyan-900 font-semibold hover:underline"
          >
            + Add Product
          </button>

          {getSummaryItems().length > 0 && (
            <div className="w-full mb-6">
              <h2 className="font-semibold text-lg mb-2">Summary</h2>
              <table className="w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2 border-b">Product</th>
                    <th className="text-right p-2 border-b">Qty</th>
                    <th className="text-right p-2 border-b">Price</th>
                    <th className="text-right p-2 border-b">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {getSummaryItems().map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border-b">{item.name}</td>
                      <td className="p-2 border-b text-right">{item.qty}</td>
                      <td className="p-2 border-b text-right">
                        {item.price.toLocaleString()}
                      </td>
                      <td className="p-2 border-b text-right">
                        {item.subtotal.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="p-2 font-semibold text-right">
                      Total
                    </td>
                    <td className="p-2 font-semibold text-right">
                      {getTotal().toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <button
            type="button"
            onClick={submitTransaction}
            className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-cyan-700"
          >
            Submit Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;
