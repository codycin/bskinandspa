// Pages/HomePage.tsx
import Hero from "../Components/Hero";
import ServicesOverview from "../Components/ServicesOverview";
import Contact from "../Components/Contact";
import WhyChooseUs from "../Components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
      <Contact />
    </>
  );
}
