interface Category {
    id: number;
    category: string;
    state: boolean;
  }
  
  interface CategorySelectProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  }
  
  export const CategorySelect: React.FC<CategorySelectProps> = ({
    categories,
    setCategories
  }) => {
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      const categoryId = Number(e.target.value);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, state: !category.state } 
            : category
        )
      );
    };
  
    return (
      <div className="grid gap-0">
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={category.state}
              onChange={handleCheck}
            />
            {category.category}
          </label>
        ))}
      </div>
    );
  };
  