import React from 'react'
import useSEO from "../utils/useSEO";
import CareersBanner from '../components/carrers/carrersbanner'
import LifeAtUbona from '../components/carrers/lifeatubona'
import CareersSection from '../components/carrers/jobpost'
import TestimonialSection from '../components/home/testimonial'
import { Testimonials } from "../static/careerData";
import WhyUbona from '../components/carrers/whyubona'
import GreatCards from "../components/about/greatCards";
function Carrers() {
  useSEO({
    title: "Join Ubona: Careers in Cloud-Based Call Center Solutions",
    description: "Explore exciting career opportunities at Ubona, a leader in AI based IVR, customer support chatbots, and the best cloud telephony solutions in India."
  });
  return (
    <div>
      <div className="bg-[#001528] pt-20.5 md:pt-0">
        <CareersBanner/>
      </div>
      <GreatCards />
      <LifeAtUbona/>
      <CareersSection/>
      <TestimonialSection testimonials={Testimonials} heading="Hear It From the People Who Make Ubona What It Is" buttonLink={false} />
      <WhyUbona/>
    </div>
  )
}

export default Carrers
