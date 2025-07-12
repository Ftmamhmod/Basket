import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Hero1 from "../../assets/img/Hero1.png";
import Hero2 from "../../assets/img/Hero2.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-r from-teal-400 to-teal-300 overflow-hidden">
      <div className="w-screen h-1/2 mx-auto ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="hero-swiper h-96 w-screen"
        >
          <SwiperSlide className="relative">
            <div className="absolute inset-0 overflow-hidden">
              <img
                loading="lazy"
                src={Hero1}
                alt="Grocery Products"
                className="w-screen h-full object-cover min-h-full min-w-full"
              />
            </div>

            <div className="relative z-10 container mx-auto h-full flex items-center py-12 px-12 sm:px-12 lg:px-20">
              <div className="max-w-xl">
                <div className="mb-4">
                  <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    EXCLUSIVE OFFER
                  </span>
                  <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-full ml-2">
                    20% OFF
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Specialist in the
                  <br />
                  grocery store
                </h1>
                <p className="text-white/90 text-lg mb-6">
                  Only this week. Don't miss...
                </p>
                <div className="flex items-center mb-6">
                  <span className="text-white/80 mr-2">from</span>
                  <span className="text-3xl font-bold text-white">$7.99</span>
                </div>
                <button
                  onClick={() => navigate("/shop")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Shop Now →
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <div className="absolute inset-0 overflow-hidden">
              <img
                loading="lazy"
                src={Hero2}
                alt="Grocery Products"
                className="w-full h-full object-cover min-h-full min-w-full"
              />

              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="relative z-10 container mx-auto h-full flex items-center py-12 px-12 sm:px-12 lg:px-20">
              <div className="max-w-xl">
                <div className="mb-4">
                  <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    EXCLUSIVE OFFER
                  </span>
                  <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-full ml-2">
                    20% OFF
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Specialist in the
                  <br />
                  grocery store
                </h1>
                <p className="text-white/90 text-lg mb-6">
                  Only this week. Don't miss...
                </p>
                <div className="flex items-center mb-6">
                  <span className="text-white/80 mr-2">from</span>
                  <span className="text-3xl font-bold text-white">$7.99</span>
                </div>
                <button
                  onClick={() => navigate("/shop")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Shop Now →
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
