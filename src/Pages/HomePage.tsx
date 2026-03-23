import Hero from "../Components/Hero";
import ServicesOverview from "../Components/ServicesOverview";
import Contact from "../Components/Contact";
import WhyChooseUs from "../Components/WhyChooseUs";
import { BackToTopButton } from "../Components/BackToTopButton";

export default function Home() {
  return (
    <>
      <BackToTopButton />

      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
      <Contact />
    </>
  );
}
