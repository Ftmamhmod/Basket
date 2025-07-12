import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./../../components/ui/HeroSection";
import CategoriesSection from "./../../components/ui/CategoriesSection";
import { useEffect } from "react";
import actGetProducts from "../../store/products/actGetProduct";
import ProductSlider from "../../components/ui/ProductSlider";
import {
  Mistakes,
  Posters,
  Products,
  Top,
} from "../../components/Products/HomeComrpnents";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetProducts());
  }, [dispatch]);

  const { products, loading, error } = useSelector((state) => state.products);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <CategoriesSection />
        <ProductSlider
          featuredProducts={products}
          loading={loading}
          error={error}
        />
      </div>
      <div className=" lg:px-[150px] m-auto md:px-[80px] px-[30px]">
        <Top />
        <Products featuredProducts={products} />
        <Posters />
        <Mistakes />
      </div>
    </>
  );
};

export default Home;
