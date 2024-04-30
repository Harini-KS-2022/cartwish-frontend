import React from "react";

import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iphone 14 pro"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/66224a4e6152fe81bf181c83"
        image={iphone}
      />

      <FeaturedProducts />

      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and color-matched Magic accessories to your Mac after you configure your Mac mini."
        link="/product/66224a4e6152fe81bf181c8b"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
