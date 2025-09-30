import { FC } from "react";
import { useRouter } from "next/router";
import {
  CreditCardIcon,
  ListBulletIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";
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

const DashboardPage: FC<PageProps> = ({authorization}) => {
  const router = useRouter();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to log out?"
    );
    if (!confirmDelete) return;

    router.push("/api/logout");
  };

  return (
    <div className="min-h-screen flex flex-row justify-center items-center gap-4 bg-white text-gray-900 font-sans pt-2">
  
    </div>
  );
};

export default DashboardPage;
