import React, { useEffect } from "react";
import ProductMain from "./ProductMain";

function ProductsShop({ setCountProducts, products }) {
  useEffect(() => {
    if (Array.isArray(products)) {
      setCountProducts(products.length);
    }
  }, [products, setCountProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 justify-items-center">
      {products.map((product) => (
        <ProductMain
          key={product.id}
          id={product.id}
          image={
            product.images && product.images.length > 0
              ? product.images[0]
              : product.images[1]
          }
          title={product.title}
          price={product.price}
          availabilityStatus={product.availabilityStatus}
          rating={product.rating}
          discount={product.discountPercentage}
          size="medium"
          showAddButton={false}
          addQuantity={true}
        />
      ))}
    </div>
  );
}

export default ProductsShop;
