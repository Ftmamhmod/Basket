import { useSearchParams, useNavigate } from "react-router-dom";

const CategoryLink = ({ category, children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    const current = new Set(searchParams.getAll("category"));
    current.add(category);

    const newParams = new URLSearchParams();
    [...current].forEach((val) => newParams.append("category", val));

    navigate(`/shop?${newParams.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className="block text-sm hover:text-[#1773B0] cursor-pointer"
    >
      {children}
    </button>
  );
};

export default CategoryLink;
