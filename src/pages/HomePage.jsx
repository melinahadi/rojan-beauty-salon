import Hero from "../components/home/Hero";
import Philosophy from "../components/home/Philosophy";
import ServiceList from "../components/home/ServiceList";
import StylistGrid from "../components/home/StylistGrid";
import Gallery from "../components/home/Gallery";
import Testimonial from "../components/home/Testimonial";
import CtaBand from "../components/home/CtaBand";
import { useScrollToHash } from "../hooks/useScrollToHash";
import SEO from "../components/SEO";

export default function HomePage() {
  useScrollToHash();

  return (
    <>
      <SEO />
      <Hero />
      <Philosophy />
      <ServiceList />
      <StylistGrid />
      <Gallery />
      <Testimonial />
      <CtaBand />
    </>
  );
}
