import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import actGetcarouselProducts from "@/store/carouselProducts/actGetcarouselProducts";

const CarouselSpacing = (categoryName) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (categoryName.categoryName) {
      dispatch(actGetcarouselProducts(categoryName.categoryName));
    }
  }, [dispatch, categoryName]);

  const categoryProducts = useSelector((state) => state.carousel.products);

  return (
    <Carousel className="w-full md:max-w-[500px] lg:max-w-[700px] hidden md:block">
      <CarouselContent className="">
        {categoryProducts.map((product, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <Card className="p-3 ">
                <CardContent className="p-0 pb-3">
                  {product.onSale && (
                    <span className="absolute top-2 left-2 bg-emerald-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      ON SALE
                    </span>
                  )}
                  <div className="w-full h-full relative">
                    <img
                      loading="lazy"
                      src={product.images[0]}
                      alt={product.title}
                      width={1000}
                      height={1000}
                      className="w-full h-32 object-contain"
                    />

                    <button className="absolute flex justify-center items-center cursor-pointer bottom-3 right-3 bg-[#35AFA0] hover:bg-[#35af86] text-white w-7 h-7 rounded-full text-center text-lg leading-6 font-bold">
                      {product.stock > 0 ? (
                        "+"
                      ) : (
                        <svg
                          width="19"
                          height="20"
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.875 10.03C11.875 10.6599 11.6248 11.264 11.1794 11.7094C10.734 12.1548 10.1299 12.405 9.5 12.405C8.87011 12.405 8.26602 12.1548 7.82062 11.7094C7.37522 11.264 7.125 10.6599 7.125 10.03C7.125 9.40014 7.37522 8.79605 7.82062 8.35065C8.26602 7.90525 8.87011 7.65503 9.5 7.65503C10.1299 7.65503 10.734 7.90525 11.1794 8.35065C11.6248 8.79605 11.875 9.40014 11.875 10.03Z"
                            stroke="white"
                            stroke-width="1.58333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.94629 10.0301C2.95487 6.81828 5.95608 4.4884 9.50037 4.4884C13.0455 4.4884 16.0459 6.81828 17.0545 10.0301C16.0459 13.2419 13.0455 15.5717 9.50037 15.5717C5.95608 15.5717 2.95487 13.2419 1.94629 10.0301Z"
                            stroke="white"
                            stroke-width="1.58333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="text-sm">
                    {product.discountPercentage ? (
                      <div className="flex gap-1 justify-start items-center">
                        <span>
                          $
                          {(
                            product.price -
                            (product.price / 100) * product.discountPercentage
                          ).toFixed(2)}
                        </span>
                        <span className="ml-2 text-gray-400 line-through text-xs">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}

                    <p className="text-sm font-normal mt-1  overflow-hidden text-ellipsis whitespace-nowrap">
                      {product.title}
                    </p>

                    {/* <p className="text-xs text-gray-500">{product.unit}</p> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselSpacing;
