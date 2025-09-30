import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import { transaction_detail_response } from "@/api-lib/ts-schema/transaction_detail_response";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
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

const TransactionPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<transaction_detail_response[]>([]);

  const fetchTransactionData = async () => {

    try {
      const query: any = { limit, offset };
      const res = await new AxiosCaller(base_url).call[
        "GET /transactions"
      ]({
        headers: { authorization },
        query,
      });
      setData(res);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    try {
      await new AxiosCaller(base_url).call[
        "DELETE /transaction/:id"
      ]({
        headers: { authorization },
        paths: { id },
      });

      alert("Transaction deleted");
      fetchTransactionData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete transaction");
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [offset]);

  const handleNext = () => setOffset((prev) => prev + limit);
  const handlePrev = () => setOffset((prev) => Math.max(prev - limit, 0));

  return (
    <div className="h-full flex flex-col bg-white text-gray-900 font-sans pt-2">
      <div className="flex flex-1 flex-col mt-2 px-4 max-w-6xl mx-auto gap-4 h-fit">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Transaction List</h1>
          <button
            className="flex items-center gap-2 bg-cyan-900 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md hover:bg-cyan-700 transition-colors duration-300"
            onClick={() => router.push("/transaction/add")}
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Add Transaction</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm table-fixed">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 font-semibold w-24">Transaction ID</th>
                <th className="py-3 px-4 font-semibold w-24">User ID</th>
                <th className="py-3 px-4 font-semibold w-32">Total Transaction</th>
                <th className="py-3 px-4 font-semibold w-20">Total Qty</th>
                <th className="py-3 px-4 font-semibold w-72">Items</th>
                <th className="py-3 px-4 font-semibold w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((trx) => {
                const itemList = trx.transaction_item
                  .map((item) => `${item.otm_product_id?.name || "Unknown"} x${item.qty}`)
                  .join(", ");

                const totalQty = trx.transaction_item.reduce((sum, item) => sum + item.qty, 0);

                return (
                  <tr
                    key={trx.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-4">{trx.id}</td>
                    <td className="py-2 px-4">{trx.user_id}</td>
                    <td className="py-2 px-4">Rp {trx.total.toLocaleString()}</td>
                    <td className="py-2 px-4">{totalQty}</td>
                    <td className="py-2 px-4">{itemList}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleDeleteTransaction(trx.id)}
                        className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        title="Delete Transaction"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
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

export default TransactionPage;
