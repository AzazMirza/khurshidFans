import Navbar from "@/components/ui/navbar";
import Hero05 from "@/components/hero-05";
import Contact02 from "@/components/contact-02";
import Stats01 from "@/components/stats-01";
import FeatureProducts from "@/components/featureProducts";
import Testimonial06 from "@/components/Testimonial06";
import Footer from "@/components/footer-04";
import CTA from "@/components/CTA";
import FAQ from "@/components/faq";
import Message from "@/components/Massage";
import Spinner from "@/components/ui/Spinner";
import Banner from "@/components/ui/banner";
import Maps from "@/components/ui/maps";
import { BubbleBackground } from "@/components/ui/bubble-background/bubble-background";
import BackToTopButton from "@/components/BackToTopButton";


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero05 />
      <Stats01 />
      <FeatureProducts />
      <BubbleBackground interactive>
        <div className="relative z-10 ">
          <Message />
          <Testimonial06 />
          <FAQ />
          <Banner />
          <Contact02 />
          <CTA />
        </div>
      </BubbleBackground>
      <Maps />
      <Footer />
      <BackToTopButton />
    </div>
    
  );
}
