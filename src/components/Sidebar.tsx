import {
  PlusCircleIcon,
  ShoppingBagIcon,
  TagIcon,
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

type SideBarItem = {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    href: string;
    query?: ParsedUrlQueryInput;
  }[];
};

const sideBarItems: SideBarItem[] = [
  {
    title: "Transaction",
    items: [
      {
        icon: ClipboardDocumentListIcon,
        label: "View Transactions",
        href: "/transaction",
        query: { page: 1 },
      },
      {
        icon: PlusCircleIcon,
        label: "Add Transaction",
        href: "/transaction/add",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        icon: ShoppingBagIcon,
        label: "View Products",
        href: "/product",
        query: { page: 1 },
      },
      {
        icon: PlusCircleIcon,
        label: "Add Product",
        href: "/product/add",
      },
    ],
  },
  {
    title: "Category",
    items: [
      {
        icon: TagIcon,
        label: "View Categories",
        href: "/category",
        query: { page: 1 },
      },
      {
        icon: PlusCircleIcon,
        label: "Add Category",
        href: "/category/add",
      },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="lg:w-60 w-15 pt-4 text-sm flex flex-col justify-between bg-white h-full fixed left-0 top-0 overflow-hidden shadow">

      <div className="flex flex-col gap-2 mx-4 py-4">
        <Link
          href="/dashboard"
          className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md ${
            currentPath === "/dashboard"
              ? "text-white font-semibold bg-cyan-900"
              : "text-black hover:bg-cyan-500 hover:text-white font-medium"
          } transition-all duration-200`}
        >
          <HomeIcon
            className={`w-5 h-5 ${
              currentPath === "/dashboard" ? "text-white" : "text-black"
            }`}
          />
          <span className="hidden lg:inline">Dashboard</span>
        </Link>
      </div>

      {sideBarItems.map((section) => (
        <div className="flex flex-col gap-2 mx-4 py-4" key={section.title}>
          <p className="hidden lg:inline font-bold text-lg text-cyan-900">
            {section.title}
          </p>
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                href={
                  item.query
                    ? { pathname: item.href, query: item.query }
                    : item.href
                }
                key={item.label}
                className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md ${
                  isActive
                    ? " text-white font-semibold bg-cyan-900"
                    : "text-black hover:bg-cyan-500 hover:text-white font-medium"
                } transition-all duration-200`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      <div className="mt-auto mb-2">
        <Link
          href="/api/logout"
          className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md mx-4 mb-4 text-black hover:bg-cyan-500 hover:text-white font-medium transition-all duration-200"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          <span className="hidden lg:inline">Logout</span>
        </Link>
      </div>
    </div>
  );
}
