import ProductMain from "../ui/ProductMain";
import poster1 from "../../assets/img/product/1.png";
import poster2 from "../../assets/img/product/2.png";
import poster3 from "../../assets/img/product/3.png";
import poster4 from "../../assets/img/product/4.png";
import poster5 from "../../assets/img/product/5.png";
import poster6 from "../../assets/img/product/6.png";
import { useNavigate } from "react-router-dom";

export function Top() {
  return (
    <>
      <div className="bg-[#FBEACF] rounded-[5px] py-[10px] text-center  uppercase my-[20px] md:my-[50px] lg:py-[15px]">
        <p className="tracking-[2px] font-[600] text-[10px] md:text-[15px] md:font-[700] ">
          Super discount for your first purchase.
        </p>
      </div>
    </>
  );
}
export function Products({ featuredProducts }) {
  return (
    <>
      <div className="border border-[#EDEEF5] rounded-2xl mb-12 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 ">
          {featuredProducts.slice(16, 26).map((product) => (
            <div key={product?.id} className="p-4 sm:p-3  last:border-r-0 ">
              <ProductMain
                id={product.id}
                image={product?.images[0]}
                title={product?.title}
                price={product?.price}
                discount={product?.discountPercentage}
                availabilityStatus={product?.availabilityStatus}
                rating={product?.rating}
                isNew={product?.isNew}
                size="medium"
                showAddButton={false}
                addQuantity={false}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function Posters() {
  return (
    <>
      <div className="flex mb-[50px] m-auto gap-[20px] flex-wrap ">
        <Poster posterImg={poster1} />
        <Poster posterImg={poster2} />
        <Poster posterImg={poster3} />
      </div>
    </>
  );
}
export function Poster({ posterImg }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden md:flex-1/3  lg:flex-1/4 lg:max-w-[400px] ">
        <img
          loading="lazy"
          className="w-full h-full"
          src={posterImg}
          alt="poster image"
        />
        <div className="absolute top-[20px] lg:top-[28px] left-0  p-[20px] ">
          <p className="text-[#00B853] md:font-[500] md:text-[14px] ">
            Weekend Discount 40%
          </p>
          <p className="text-[#3E445A] font-[600] text-[24px]">Natural Eggs</p>
          <p className="text-[#9B9BB4] font-[400] text-[12px]">
            Eat one every day
          </p>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/shop");
            }}
            className="rounded-2xl my-[10px] bg-[#C2C2D3] px-[15px] py-[10px] text-white cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
}

export function Mistakes() {
  return (
    <>
      <div className="flex gap-[20px] flex-wrap mb-[100px]">
        <Mistake mistageImg={poster4} />
        <Mistake mistageImg={poster5} />
        <Mistake mistageImg={poster6} />
      </div>
    </>
  );
}
export function Mistake({ mistageImg }) {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden md:flex-1/3  lg:flex-1/4 lg:max-w-[400px] ">
        <div className="mb-[10px] rounded-b-2xl overflow-hidden">
          <img
            loading="lazy"
            className="w-full h-full"
            src={mistageImg}
            alt="water photo"
          />
        </div>
        <div>
          <p className="text-[#9B9BB4] text-[13px] font-[300] uppercase my-[10px]">
            Grocery
          </p>
          <p className="text-[#202435] font-[600] text-[17px] ">
            But I must explain to you how all this mistaken idea
          </p>
          <p className="text-[#71778E] font-[500] text-[14px] mt-[6px]">
            Jan 13 2025
          </p>
        </div>
      </div>
    </>
  );
}
