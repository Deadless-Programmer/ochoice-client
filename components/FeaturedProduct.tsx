"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/features/productSlice";
import FeaturedProductCard from "./FeaturedProductCard";



const FeaturedProduct: React.FC = () => {


 const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);


 useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

      if (loading)
      return (
        <div className="text-center py-10 text-yellow-500 font-semibold">
          Loading products...
        </div>
      );
  
       if (error)
      return (
        <div className="text-center py-10 text-red-500 font-semibold">
          {error}
        </div>
      );
  const featuredProduct = products.find(product => product.label ==="Featured Product")


  return <FeaturedProductCard featuredProduct ={featuredProduct} />;
};

export default FeaturedProduct;
