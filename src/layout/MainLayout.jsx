import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PopBob from "@/components/popbob";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "@/store/popBob/popBobSlice";

const MainLayout = () => {
  const { open, selectedProductId } = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  return (
    <div>
      <Header />
      <Outlet />
      <PopBob
        open={open}
        onOpenChange={(val) => {
          if (!val) dispatch(closePopup());
        }}
        selectedProductId={selectedProductId}
      />
      <Footer />
    </div>
  );
};

export default MainLayout;
