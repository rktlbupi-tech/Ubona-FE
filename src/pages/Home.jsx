import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../components/home/Banner";
import LogoSliderTabs from "../components/logoSliderTabs";
import TestimonialSection from "../components/home/testimonial";
import AboutSection from "../components/home/about";
import OutComes from "../components/home/outComes";
import BannerSlider from "../components/home/recentUpdate";
import HaloShowcase from "../components/home/haloShowcase";
import IndustriesSection from "../components/home/industriesSection";
import HCaseStudies from "../components/home/caseStudies";
import { Testimonials } from "../static/homeData";
import "../App.css";
function Home() {
  return (
    <div className="">
      <Banner />
      <LogoSliderTabs />
      <TestimonialSection testimonials={Testimonials} buttonLink={true} />
      <AboutSection />
      <OutComes />
      <BannerSlider />
      <HaloShowcase />
      <IndustriesSection />
      <HCaseStudies />
    </div>
  );
}
export default Home;
