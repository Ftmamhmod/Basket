import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import CarouselSpacing from "./Carousel";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductDetails from "./ProductDetails";
import { useEffect, useState } from "react";
import actGetProductById from "@/store/popBob/actGetProductById";
import { ImSpinner9 } from "react-icons/im";
import { closePopup } from "../../store/popBob/popBobSlice";
const PopBob = ({ open, onOpenChange, selectedProductId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedProductId) {
      dispatch(actGetProductById(selectedProductId));
    }
  }, [dispatch, selectedProductId]);

  const product = useSelector((state) => state.popup.product);

  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="popupContent max-h-[92vh] overflow-y-auto gap-0  p-4 ">
        {loading && (
          <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center bg-black/50 z-50 text-white  border-0">
            <ImSpinner9 className="text-5xl animate-spin " />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductImageCarousel images={product?.images || []} />
          <ProductDetails
            product={product}
            loading={(loading) => setLoading(loading)}
            onClosePopup={() => dispatch(closePopup())}
          />
        </div>

        <div className="hidden md:flex w-full flex-col justify-center items-center gap-2 mt-4">
          <h2 className="self-start font-bold text-xl">Related products</h2>
          <CarouselSpacing categoryName={product?.category} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopBob;
