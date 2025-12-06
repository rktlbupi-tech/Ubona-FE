import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const ScrollReveal = ({ cards }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentCard, setCurrentCard] = useState(-1); // Start with -1 (no cards shown)
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollTriggerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const hasInitialized = useRef(false);
  const currentCardRef = useRef(-1);


  // Initialize all cards as hidden on mount
  useEffect(() => {
    if (cardRefs.current.length === 0 || hasInitialized.current) return;

    cards.forEach((_, i) => {
      if (cardRefs.current[i]) {
        gsap.set(cardRefs.current[i], {
          y: 100,
          opacity: 0,
        });
      }
    });
    hasInitialized.current = true;
  }, [cards]);

  // Animate cards based on currentCard index
  useEffect(() => {
    if (cardRefs.current.length === 0 || !hasInitialized.current) return;

    // Update ref to track current card state
    currentCardRef.current = currentCard;

    cards.forEach((_, i) => {
      if (!cardRefs.current[i]) return;

      if (i <= currentCard) {
        // Show this card
        gsap.to(cardRefs.current[i], {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Hide this card
        gsap.to(cardRefs.current[i], {
          y: 100,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [currentCard, cards]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      ScrollTrigger.create({
        trigger: section,
        start: "top center", // half screen
        onEnter: () => setCurrentCard(0),
        // onEnterBack: () => setCurrentCard(0),
        // onLeaveBack: () => setCurrentCard(-1),
      });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top +=100",
        end: () => `+=${cards.length * 110}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          // Show first card immediately when section starts pinning (with heading)
          setCurrentCard(0);
        },
        onUpdate: (self) => {
          // Ensure first card is shown when section is active/pinned
          if (self.isActive && currentCardRef.current < 0) {
            setCurrentCard(0);
          }
        },
        onLeave: () => {
          setCurrentCard(cards.length - 1); // Ensure all cards are shown when leaving
        },
        onEnterBack: () => {
          // When re-entering from bottom, show all cards
          setCurrentCard(0);
        },
        onLeaveBack: () => {
          // Only hide cards when completely leaving the section (scrolling up past it)
          setCurrentCard(-1);
        },
      });

      scrollTriggerRef.current = st;

      // Handle wheel events for card-by-card scrolling
      const handleWheel = (e) => {
        const isPinned = st.isActive;

        // Allow wheel if pinned OR if user is going UP and there are cards to hide
        if (!isPinned && currentCardRef.current <= 0) return;

        if (isScrollingRef.current) return;
        isScrollingRef.current = true;

        if (e.deltaY > 0) {
          // Scrolling down - show next card
          setCurrentCard(prev => {
            const next = Math.min(prev + 1, cards.length - 1);
            if (next === cards.length - 1 && prev === cards.length - 1) {
              // Already at last card, allow normal scroll to continue
              isScrollingRef.current = false;
              return prev;
            }
            if (next > prev) {
              e.preventDefault(); // Only prevent default if showing a new card
            }
            return next;
          });
        } else if (e.deltaY < 0) {
          // Scrolling up - show previous card (but not below first card when pinned)
          setCurrentCard(prev => {
            const newCard = Math.max(prev - 1, 0); // Minimum is 0 (first card) when section is pinned
            if (newCard < prev && prev > 0) {
              e.preventDefault(); // Only prevent default if there's a card to go back to
            }
            return newCard;
          });
        }

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600); // Debounce time
      };

      // const sectionElement = sectionRef.current;
      section.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        section.removeEventListener("wheel", handleWheel);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [cards.length]);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
    >
      <h3 className="text-[1.75rem] text-[#003066] font-medium tracking-tight text-center md:text-left mb-10">Transformative Outcomes</h3>
      {/* Wrapper with enough space */}
      <div className="relative w-full flex justify-center overflow-visible">
        <div className="relative w-full h-[600px] overflow-visible">
          {cards.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`absolute flex flex-col justify-between w-full md:w-[23.5%] h-[348px] md:h-[308px] rounded-xl shadow-xl p-6 transition-all duration-700 ${item.color} ${item.text}`}
              style={
                isDesktop
                  ? {
                    left: `${i * 25}%`,
                    top: `${i * 90}px`,
                    zIndex: 10 - i,
                  }
                  : {
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
