
import AboutInfo from "@/components/AboutInfo";
import BlogPage from "@/components/BlogPage";
import FeaturedProduct from "@/components/FeaturedProduct";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";


export default function Home() {
  return (
   <div>
    {/* <h1 className="text-7xl font-semibold text-amber-400">Hello next js</h1> */}
    <Header></Header>
    <ProductCard></ProductCard>
    <AboutInfo></AboutInfo>
    <FeaturedProduct/>
    <BlogPage/>
    <Footer/>
   </div>
  );
}
