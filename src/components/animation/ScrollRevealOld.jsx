import React, { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ cards }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger cards to appear one by one
            cards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 200); // 200ms delay between each card
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [cards]);

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
        <div className="relative w-full h-[600px] overflow-visible">
          {cards.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)} 
              className={`absolute flex flex-col justify-between w-full md:w-[23.5%] h-[348px] md:h-[308px] rounded-xl shadow-xl p-6 transition-all duration-700 ${item.color} ${item.text}`}
              style={{
                ...(isDesktop
                  ? {
                      left: `${i * 25}%`,
                      top: `${i * 70}px`,
                      zIndex: 10 - i,
                    }
                  : {
                      top: `${i * 70}px`,
                    }),
                opacity: visibleCards.includes(i) ? 1 : 0,
                transform: visibleCards.includes(i) ? 'translateY(0)' : 'translateY(50px)',
              }}
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
