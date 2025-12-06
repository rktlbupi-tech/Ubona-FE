import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LazyImage from "../components/lazyImage"; 
import ButtonArrow from "../components/buttonArrow";
import ButtonNormal from "../components/buttonNormal";
import Breadcrumb from "../components/breadCrumb";
import TestimonialSection from "../components/home/testimonial";
import { solutionFeatureData } from "../static/solutionDataFeature";
import { Testimonials } from "../static/homeData";
import "../App.css";

function OurSolutionFeatures() {
  const { slug } = useParams(); // e.g. /our-solution/genie/key-feature
  const pageData = solutionFeatureData[slug];
  const featureCards = pageData?.featureCards || [];

  return (
    <div className="">
      <div className="banr-wrap pt-50 bg-[#00081F] relative overflow-hidden">
        <div className="flex justify-center">
          <Breadcrumb />
        </div>
        <div className="text-center mb-10">
          <div className="">
            <img src="/assets/images/solution/solution-sub-bnr.webp" alt="halo rays banner" />
          </div>
        </div>
        <div className="px-4 xl:px-12 2xl:px-22">
          <div className="rounded-4xl flex justify-center backdrop-blur-xl overflow-hidden" 
            style={{ background: "linear-gradient(180deg, rgba(0, 22, 44, 0.60) 28.51%, rgba(153, 14, 89, 0.60) 100%)"}}
          >
            <div className={`py-21 ${pageData?.ftrbnrBgWidthClass}`}>
              <div className={`flex flex-wrap justify-center gap-12 bg-no-repeat bg-center-top pb-170 ${pageData?.ftrbannerBgClass} ${pageData?.ftrbnrPdClass}`}>
                {featureCards.map((card) => (
                  <div 
                    key={card.id}
                    className="small-box border border-white/60 rounded-2xl backdrop-blur-2xl py-4.25 px-4 flex flex-col items-center justify-center gap-4 w-[166px] min-h-[148px] hover:scale-105 transition-transform duration-300"
                    style={{ background: "linear-gradient(180deg, rgba(18, 105, 205, 1) 16.94%, rgba(98, 70, 236, 1) 99.97%)"}}
                  >
                    <div className="">
                      <LazyImage effect="blur" src={card.icon} alt={card.iconalt} className="w-full" />
                      </div>
                    <h3 className="text-[#FFEECA] text-base 2xl:text-lg font-normal text-center">{card.title}</h3>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-6 -mt-35">
                <ButtonArrow
                  to="/contact-us"
                  text="Schedule Tailored Demo"
                  bgColor="#FFBF3C"
                  hoverColor="#1269CD"
                  textColor="#000"
                  hoverTextColor="#fff"
                  padding="pl-4 py-1 pr-1"
                  rounded="rounded-full"
                  textSize="text-base"
                />
                <ButtonNormal
                  to="/"
                  text="Download Feature list"
                  bgColor="#ABABAB/30"
                  hoverColor="#1269CD"
                  textColor="#FBFBFB"
                  hoverTextColor="#fff"
                  padding="px-6 py-1"
                  rounded="rounded-full"
                  textSize="text-base"
                  icon={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialSection testimonials={Testimonials} />
      {/* <div className="flex flex-wrap">
        <div className="rounded-2xl border border-[#D9D9D9] bg-white p-3.5">
          <div className="rounded-lg border border-[#D9D9D9] bg-[#FFF9E9] px-6 py-8">
            <div>
              <p>Overview</p>
              <LazyImage effect="blur" src={card.icon} alt={card.iconalt} className="w-full" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default OurSolutionFeatures;