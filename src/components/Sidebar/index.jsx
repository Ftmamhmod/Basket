import React, { useEffect, useState } from "react";
import imgShop from "../../assets/img/shop/aeb9763b1145b3dd6e2fadd6c2b27941d3d7b0fa.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categories/actGetCategories";
import { fetchCategoriesProducts } from "@/store/categoryProducts/actGetCategoryProducts";
import { useSearchParams } from "react-router-dom";

import Brands from "./Brands";

function Sidebar({
  onPriceChange,
  selectedAvailability,
  onAvailabilityChange,
}) {
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories || []);
  const categoriesProducts = useSelector(
    (state) => state.categoriesProducts || []
  );
  const allProducts = useSelector(
    (state) => state.categoriesProducts.categories || []
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll("category");
  const selectedBrands = searchParams.getAll("brand");

  const allBrands = Array.isArray(categoriesProducts.categories)
    ? categoriesProducts.categories
        .map((brand) => brand.brand)
        .filter((brand) => brand && brand.trim() !== "")
    : [];

  const uniqueBrands = [...new Set(allBrands)];

  const brandCounts = {};
  if (Array.isArray(categoriesProducts.categories)) {
    categoriesProducts.categories.forEach((product) => {
      const brand = product.brand?.trim();
      if (brand) {
        brandCounts[brand] = (brandCounts[brand] || 0) + 1;
      }
    });
  }

  const uniqueAvailabilityStatuses = [
    ...new Set(allProducts.map((p) => p.availabilityStatus).filter(Boolean)),
  ];

  const statusCounts = {};
  allProducts.forEach((product) => {
    const status = product.availabilityStatus?.trim();
    if (status) {
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    }
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoriesProducts());
  }, [dispatch]);

  useEffect(() => {
    onPriceChange(priceFrom, priceTo);
  }, [priceFrom, priceTo, onPriceChange]);

  const toggleParam = (param, value, isChecked) => {
    const current = searchParams.getAll(param);
    const updated = isChecked
      ? [...new Set([...current, value])]
      : current.filter((item) => item !== value);

    searchParams.delete(param);
    updated.forEach((v) => searchParams.append(param, v));
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <aside>
      <div>
        <h2 className="text-[#202435] font-semibold text-[15px] uppercase dosis pb-4">
          Product Categories
        </h2>
        <ul className="list-none p-0">
          {categories.map((category, index) => {
            const inputId = `category-${index}`;
            return (
              <li className="py-2 px-2" key={category.slug}>
                <div className="relative">
                  <input
                    type="checkbox"
                    id={inputId}
                    className="peer hidden"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={(e) =>
                      toggleParam("category", category.slug, e.target.checked)
                    }
                  />
                  <label
                    htmlFor={inputId}
                    className="pl-6 text-[15px] cursor-pointer text-[#71778E]"
                  >
                    {category.name}
                  </label>
                  <span className="absolute w-4 h-4 left-0 top-1/2 -translate-y-1/2 bg-[#f2f3f4] border border-[#71778ec5] peer-checked:bg-[#35AFA0] pointer-events-none"></span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Brands
        uniqueBrands={uniqueBrands}
        selectedBrands={selectedBrands}
        toggleParam={toggleParam}
        brandCounts={brandCounts}
      />

      <div className="pt-6">
        <h2 className="text-[#202435] font-semibold text-[15px] uppercase dosis pb-4">
          Price
        </h2>
        <div className="flex align-center justify-between gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="priceFrom" className="text-sm text-[#71778E] mb-1">
              From
            </label>
            <input
              type="number"
              id="priceFrom"
              placeholder="0"
              className="w-full border border-[#ccc] rounded px-4 py-4 text-sm focus:outline-none bg-[#F3F4F7]"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-[#71778E] text-sm">-</span>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="priceTo" className="text-sm text-[#71778E] mb-1">
              To
            </label>
            <input
              type="number"
              id="priceTo"
              placeholder="0"
              className="w-full border border-[#ccc] rounded px-4 py-4 text-sm focus:outline-none bg-[#F3F4F7]"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h2 className="text-[#202435] font-semibold text-[15px] uppercase dosis pb-4">
          Availability
        </h2>
        <ul className="list-none p-0">
          {uniqueAvailabilityStatuses.map((status, index) => {
            const inputId = `availabilityStatus-${index}`;
            return (
              <li className="py-2 px-2" key={index}>
                <div className="relative flex items-center justify-between">
                  <input
                    type="checkbox"
                    id={inputId}
                    className="peer hidden"
                    checked={selectedAvailability.includes(status)}
                    onChange={(e) =>
                      onAvailabilityChange(status, e.target.checked)
                    }
                  />
                  <label
                    htmlFor={inputId}
                    className="pl-6 text-[15px] cursor-pointer text-[#71778E]"
                  >
                    {status}
                  </label>
                  <span className="absolute w-4 h-4 left-0 top-1/2 -translate-y-1/2 bg-[#f2f3f4] border border-[#71778ec5] peer-checked:bg-[#35AFA0] pointer-events-none"></span>
                  <span className="text-[#71778E] text-[14px]">
                    ({statusCounts[status] || 0})
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <img
          loading="lazy"
          src={imgShop}
          alt="Shop Banner"
          className="w-[270px] h-[368.69px] mt-6"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
