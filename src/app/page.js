import Image from "next/image";
import Header from "./component/Header";
import Slider from "./component/Slider";
import Product from "./component/Product";
import Faviourite from "./component/Faviourite";
import Footer from "./component/Footer";
export default function Home() {
  return (
    <div className="">
      <Header />
      <Slider />
      <Product />
    <Faviourite />
      <Footer />
     
    </div>
  );
}
