import { FC, useEffect, useState } from "react";
import { category_response } from "@/api-lib/ts-schema/category_response";
import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";

export interface ProductData {
  name: string;
  price: number;
  stock: number;
  category_id: number;
}

interface ProductFormProps {
  initialData?: ProductData;
  onSubmit: (data: ProductData) => void;
  submitLabel?: string;
  authorization: string;
}

const ProductForm: FC<ProductFormProps> = ({
  initialData = {
    name: "",
    price: 0,
    stock: 0,
    category_id: 0, 
  },
  onSubmit,
  submitLabel = "Save Product",
  authorization = "",
}) => {
  const [productData, setProductData] = useState<ProductData>(initialData);
  const [categories, setCategories] = useState<category_response[]>([]);

  const fetchCategoryData = async () => {
    try {
      const res = await new AxiosCaller("http://localhost:3001").call[
        "GET /category"
      ]({
        headers: { authorization },
        query: {},
      });
      setCategories(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "category_id"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <input
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category_id"
          value={productData.category_id}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-cyan-900 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
