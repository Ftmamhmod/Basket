import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import actGetProducts from "../../store/products/actGetProduct";
import { openPopup } from "../../store/popBob/popBobSlice";

export default function Search() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(actGetProducts());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilter([]);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilter(filtered);
    }
  }, [search, products]);

  // 👇 Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilter([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenPopup = (id) => {
    dispatch(openPopup(id));
    setFilter([]);
  };

  return (
    <div className="order-3 md:order-2 w-full relative z-50" ref={wrapperRef}>
      <div className="bg-[#F3F4F7] py-3 md:py-5 flex gap-3 md:gap-5 px-4 rounded-lg w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for Products, fruit, meat, eggs .etc..."
          className="font-[400]   w-full text-xl text-black outline-none "
        />
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.8261 20.554L18.1301 16.858C18.7541 16.074 19.2341 15.21 19.5701 14.266C19.9381 13.274 20.1221 12.266 20.1221 11.242C20.1221 9.61 19.7141 8.09 18.8981 6.682C18.1141 5.32199 17.0421 4.25 15.6821 3.466C14.2901 2.65 12.7741 2.24199 11.1341 2.24199C9.49407 2.24199 7.97007 2.65 6.56207 3.466C5.21807 4.266 4.14607 5.338 3.34607 6.682C2.53007 8.09 2.12207 9.614 2.12207 11.254C2.12207 12.894 2.53007 14.41 3.34607 15.802C4.13007 17.162 5.20207 18.234 6.56207 19.018C7.97007 19.834 9.49007 20.242 11.1221 20.242C12.1781 20.242 13.1901 20.07 14.1581 19.726C15.1261 19.382 15.9861 18.89 16.7381 18.25L20.4341 21.946C20.5301 22.042 20.6421 22.118 20.7701 22.174C20.8981 22.23 21.0181 22.258 21.1301 22.258C21.2421 22.258 21.3621 22.23 21.4901 22.174C21.6181 22.118 21.7301 22.042 21.8261 21.946C22.0341 21.754 22.1381 21.526 22.1381 21.262C22.1381 20.998 22.0341 20.762 21.8261 20.554ZM4.13807 11.242C4.13807 9.962 4.45007 8.786 5.07407 7.714C5.69807 6.658 6.53807 5.818 7.59407 5.19399C8.66607 4.57 9.84207 4.258 11.1221 4.258C12.4021 4.258 13.5861 4.57 14.6741 5.19399C15.7301 5.818 16.5701 6.662 17.1941 7.726C17.8181 8.79 18.1301 9.962 18.1301 11.242C18.1301 12.17 17.9501 13.066 17.5901 13.93C17.2301 14.794 16.7461 15.53 16.1381 16.138C15.4981 16.794 14.7581 17.294 13.9181 17.638C13.0781 17.982 12.1861 18.154 11.2421 18.154C9.93007 18.186 8.72207 17.89 7.61807 17.266C6.54607 16.674 5.69807 15.842 5.07407 14.77C4.45007 13.698 4.13807 12.522 4.13807 11.242Z"
            fill="#3E445A"
          />
        </svg>
      </div>
      <div className={` absolute top-16 bg-white w-full z-50 rounded-lg`}>
        {filter.length > 0 && (
          <div className="">
            <ul className="flex flex-col max-h-96 overflow-y-scroll ">
              {filter.map((item, index) => (
                <li
                  key={index}
                  className="p-5 shadow rounded-lg cursor-pointer"
                  onClick={() => handleOpenPopup(item.id)}
                >
                  <div className="flex w-full justify-between items-center">
                    <h1 className="font-[600] text-lg">{item.title}</h1>
                    <h1 className="text-[#35afa0]"> ${item.price} </h1>
                  </div>
                  <div className="flex justify-start items-center gap-5">
                    <p className="w-10/12">{item.description}</p>
                    <img
                      loading="lazy"
                      src={item.thumbnail}
                      alt=""
                      className="w-20"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
