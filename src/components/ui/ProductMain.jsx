import { Loader2, Star } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { openPopup } from "../../store/popBob/popBobSlice";
import ButtonQuantityCounter from "./ButtonQuantityCounter";
import { addCart } from "@/store/cart/cartSlice";
import { useEffect, useState } from "react";

const ProductMain = ({
  id,
  image,
  title,
  price,
  availabilityStatus,
  rating,
  discount,
  isNew,
  size = "medium",
  showAddButton = Boolean,
  addQuantity = Boolean,
  product,
}) => {
  const sizeClasses = {
    small: "w-32",
    medium: "w-48",
    large: "w-56",
  };

  const productData = {
    id,
    title,
    image,
    price,
    discount,
    availabilityStatus,
    rating,
    isNew,
    size,
  };
  const priceAfterDiscount = discount
    ? price - (price * discount) / 100
    : price;
  const dispatch = useDispatch();
  const handleOpenPopup = () => {
    dispatch(openPopup(id));
  };
  const [disableBtn, setdisableBtn] = useState(false);

  const addToCart = () => {
    setdisableBtn(true);
    toast.success("Login successful!");
    dispatch(addCart(product));
  };

  useEffect(() => {
    if (!disableBtn) {
      return;
    }
    const debounc = setTimeout(() => {
      setdisableBtn(false);
    }, 300);
    return () => clearTimeout(debounc);
  }, [disableBtn]);
  return (
    <div
      className={`${sizeClasses[size]} 
      flex flex-col justify-center rounded-lg shadow-sm border  bg-white  border-gray-100 hover:scale-95 transition-all duration-200 relative overflow-hidden  w-full cursor-pointer`}
    >
      <div onClick={() => handleOpenPopup()}>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
          {discount && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
              {discount}%
            </div>
          )}
          {isNew && (
            <div className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
              New
            </div>
          )}
        </div>

        {/* Product Image - Fixed Aspect Ratio */}
        <div className="p-4 pb-0 ">
          <div className="aspect-square  rounded-lg mb-3 overflow-hidden flex items-center justify-center">
            <img
              loading="lazy"
              src={image}
              alt={title}
              className="w-full h-full object-contain max-h-[180px] "
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 pt-0">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
            {title}
          </h3>
          <h3 className="uppercase font-[500] text-[15px] text-[#00B853]">
            {availabilityStatus}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>

          {/* Price and Add Button */}
          <div className="flex flex-col ">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-[#D51243]">
                ${priceAfterDiscount.toFixed(2)}
              </span>
              {price && (
                <span className="text-lg font-bold text-[#C2C2D3] line-through ">
                  ${price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" p-4 pt-0 flex flex-col gap-2 justify-center items-center">
        {showAddButton && (
          <button
            onClick={addToCart}
            className=" cursor-pointer bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition-colors w-full"
          >
            {disableBtn ? (
              <div className="flex items-center justify-center ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : (
              "Add to Cart"
            )}
          </button>
        )}

        {addQuantity && (
          <div className="w-full">
            <ButtonQuantityCounter product={productData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMain;
