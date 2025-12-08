import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ cards }) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // --- Responsive Check ---
  useEffect(() => {
    const handleResize = () =>
      setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- GSAP/ScrollTrigger Setup ---
  useEffect(() => {
    if (cardRefs.current.length === 0 || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cardElements = cardRefs.current.filter(Boolean);
      const numCards = cardElements.length;
      if (numCards === 0) return;

      // Initial state: Hidden (opacity: 0) and slightly below (y: 100).
      // The added y: -50 is the initial parallax offset.
      gsap.set(cardElements, { y: 100, opacity: 0, scale: 0.95 });

      // Create a master timeline for the sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: () => `+=${numCards * 400}px`, // Increased end distance for smoother pauses
          pin: true,
          pinSpacing: true,
          scrub: 0.5, // Smooth scrubbing
          // markers: true, // Uncomment for debugging
        },
      });

      // Stagger the animation of each card onto the screen
      cardElements.forEach((card, i) => {
        // 1. Reveal Tween: Move card up, fade in, and apply parallax pull (y: -50).
        tl.to(card, {
          y: -50, // Parallax: Animate to a higher position as it fades in
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }, i === 0 ? 0 : "<25%"); // Start the reveal before the previous one ends

        // 2. Pause Tween: Adds scroll distance where the card is fully visible.
        tl.to({}, { duration: 0.8 }); // Increased duration for a longer pause
      });

      // Optional: Animate all cards slightly down at the very end when leaving
      tl.to(cardElements, {
        y: -10,
        opacity: 0.5,
        duration: 1,
        ease: "power1.inOut"
      }, ">");


    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [cards.length]);

  // --- Render ---
  return (
     <section
      ref={sectionRef}
      className="overflow-hidden px-4"
    >
      <h3 className="text-[1.75rem] text-[#003066] font-medium tracking-tight text-center md:text-left mb-16">Transformative Outcomes</h3>
      {/* Wrapper with enough space */}
      <div className="relative w-full  flex justify-center overflow-visible">
        <div className="relative w-full h-[600px] overflow-visible">
          {cards.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)} 
              className={`absolute  flex flex-col justify-between w-full md:w-[23.5%] h-[348px] md:h-[308px] rounded-xl shadow-xl p-6 transition-all duration-700 ${item.color} ${item.text}`}
              style={
                isDesktop
                ? {
                    left: `${i * 25}%`,
                    top: `${i * 90}px`,
                    zIndex: 10 - i,
                  }
                :  {
                    top: 0,
                    left: 0,
                    width: "100%",
                    position: "absolute",
                  }
              }
            >
              <div>
                <h4 className="text-sm uppercase font-medium mb-3">
                  {item.title}
                </h4>
                <p className="text-[5.5rem] font-medium mb-3">{item.percent}</p>
              </div>
              <p className="text-base font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollReveal;