import React from "react";
import ExampleImage from "@/public/example.png";
import PageIllustration from "@/components/PageIllustrations";
import Footer from "@/components/Footer";
import FeaturesBlocks from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HeroHome from "@/components/HeroHome";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="grow">
        <div
          className="pointer-events-none relative mx-auto h-0 max-w-6xl"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>
        <HeroHome />
        <FeaturesBlocks />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};
export default App;
