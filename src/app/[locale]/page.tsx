import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Experiences from "@/components/Experiences";
import Destinations from "@/components/Destinations";
import CustomTour from "@/components/CustomTour";
import Differentiators from "@/components/Differentiators";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Features />
      <Experiences />
      <Destinations />
      <CustomTour />
      <Differentiators />
      <Footer />
    </main>
  );
}
