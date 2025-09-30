import { FC, useEffect, useState } from "react";

export interface CategoryData {
  name: string;
}

interface CategoryFormProps {
  initialData?: CategoryData;
  onSubmit: (data: CategoryData) => void;
  submitLabel?: string;
  authorization: string;
}

const CategoryForm: FC<CategoryFormProps> = ({
  initialData = {
    name: "",
  },
  onSubmit,
  submitLabel = "Save Category",
}) => {
  const [categoryData, setCategoryData] = useState<CategoryData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "category_id"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(categoryData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
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

export default CategoryForm;
