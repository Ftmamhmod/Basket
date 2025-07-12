import { useState } from "react";
import { cn } from "@/lib/utils";

const ProductImageCarousel = ({ images = [] }) => {
  const [selected, setSelected] = useState(0);

  const handleThumbClick = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex gap-4 w-full max-w-4xl mx-auto md:h-[300px]">
      <div className="flex flex-col gap-2">
        {images.map((img, index) => (
          <img
            loading="lazy"
            key={index}
            src={img}
            onClick={() => handleThumbClick(index)}
            alt={`Thumb ${index}`}
            className={cn(
              "w-10 h-10 rounded-lg border cursor-pointer object-cover transition-all",
              selected === index
                ? "border-2 border-green-500 scale-105"
                : "border border-gray-300 opacity-80 hover:opacity-100"
            )}
          />
        ))}
      </div>

      <div className="relative flex-1 border rounded-xl flex items-center justify-center overflow-hidden">
        <img
          loading="lazy"
          src={images[selected]}
          alt={`Product ${selected}`}
          className="max-h-[280px] object-contain"
        />

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
