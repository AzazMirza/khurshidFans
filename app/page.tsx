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
      <Maps/>
      {/* <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-xl shadow-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.866235498725!2d74.08948517572217!3d32.52971937376804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1b3a6e405615%3A0x33983c89be3f46b1!2sKhurshid%20Fans!5e0!3m2!1sen!2s!4v1758432216617!5m2!1sen!2s"
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
        ></iframe>
      </div> */}
      <Footer />
    </div>
  );
}
