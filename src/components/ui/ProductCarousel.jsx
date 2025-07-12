import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductMain from "./ProductMain";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = ({ title, products, loading, error }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="relative w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={products.length === 1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
          className="product-carousel "
        >
          {products.map((product) => (
            <SwiperSlide className="py-2 " key={product.id}>
              <ProductMain
                id={product.id}
                image={product?.images[0]}
                title={product?.title}
                price={product?.price}
                originalPrice={product?.discountPercentage}
                rating={product?.rating}
                availabilityStatus={product?.availabilityStatus}
                discount={product?.discountPercentage}
                isNew={product?.isNew}
                size="medium"
                showAddButton={true}
                addQuantity={false}
                product={product}
                loading={loading}
                error={error}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
