import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const ScrollReveal = ({ cards }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Make sure the pin spacer doesn't clip children
      ScrollTrigger.defaults({ pinSpacing: true });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top-=100 top",
          end: "+=3000",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });
      cards.forEach((_, i) => {
        tl.fromTo(
          cardRefs.current[i],
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          i * 0.8
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Wrapper with enough space */}
      <div className="relative w-full flex justify-center overflow-visible">
        <div className="relative w-full h-[440px] overflow-visible">
          {cards.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`absolute flex flex-col justify-between w-full md:w-[31.5%] md:h-[260px] rounded-xl shadow-xl p-6 transition-all duration-700 ${item.color} ${item.text}`}
              style={
                 isDesktop
                ? {
                    left: `${i * 34}%`,
                    top: `${i *70}px`,
                    zIndex: 10 - i,
                  }
                : {
                    top: `${i * 70}px`,
                }
              }
            >
              <div >
                <h4 className="text-[2.5rem] md:text-[3rem]   font-medium mb-3">
                  {item.title}
                </h4>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="relative md:absolute right-[0] bottom-[0]  object-cover"
              />
              <p className="text-base font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ScrollReveal;
