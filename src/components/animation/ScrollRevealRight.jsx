import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyImage from "../lazyImage";
import { Link } from "react-router-dom";
import ButtonArrow from "../buttonArrow";

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealRight = ({ cards }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const expandedCardRef = useRef(null); // Added: Ref to hold expandedCard state for ScrollTrigger

  const [expandedCard, setExpandedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  const handleToggle = (index) =>
    setExpandedCard((prev) => (prev === index ? null : index));

  // Added: Update expandedCardRef and refresh ScrollTrigger when expandedCard changes
  useEffect(() => {
    expandedCardRef.current = expandedCard;
    // Refresh ScrollTrigger to recalculate end/x positions cleanly without recreating the trigger
    ScrollTrigger.refresh();
  }, [expandedCard]);

  // Conflicting centering logic disabled to allow ScrollTrigger to handle movement
  // useEffect(() => {
  //   if (isMobile || !containerRef.current || expandedCard === null) return;

  //   const baseCardWidth = 374;
  //   const expandedCardWidth = 1162;
  //   const gap = 28;

  //   // Calculate left offset of expanded card
  //   const cardLeft = expandedCard * (baseCardWidth + gap);

  //   // Center the expanded card inside viewport
  //   const viewportWidth = window.innerWidth;
  //   const centerOffset = (viewportWidth - expandedCardWidth) / 2;

  //   // Final shift (negative = move container left, positive = right)
  //   const shift = -(cardLeft - centerOffset);

  //   gsap.to(containerRef.current, {
  //     x: shift,
  //     duration: 1,
  //     ease: "power3.out",
  //   });
  // }, [expandedCard, isMobile]);

  const calculateCardShift = (index, expandedIndex) => {
    const baseCardWidth = 374;
    const expandedCardWidth = 1162;
    const widthDifference = expandedCardWidth - baseCardWidth;

    if (expandedIndex === null) return 0;
    if (index <= expandedIndex) return 0;

    return widthDifference;
  };

  useEffect(() => {
    if (isMobile || !sectionRef.current || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 120,
        scale: 0.92,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cards.length, isMobile]);

  useEffect(() => {
    if (!containerRef.current || cardRefs.current.length === 0 || isMobile)
      return;

    const baseCardWidth = 374;
    const expandedCardWidth = 1162;

    cards.forEach((_, i) => {
      const isExpanding = expandedCard === i;
      const newWidth = isExpanding ? expandedCardWidth : baseCardWidth;
      const xShift = calculateCardShift(i, expandedCard);

      gsap.to(cardRefs.current[i], {
        width: newWidth,
        x: xShift,
        duration: 1,
        ease: "power3.inOut",
      });
    });

    //const totalWidth = cards.length * baseCardWidth + cards.length * 28 + 400;
    // const totalWidth =
    //   (cards.length - 1) * (baseCardWidth + 28) +
    //   expandedCardWidth + // include full expanded width
    //   350;
    const cardGap = 28;
    const padding = 160; // 80px left + 80px right
    const totalWidth =
      cards.length * baseCardWidth +
      (cards.length - 1) * cardGap +
      padding +
      (expandedCard !== null ? expandedCardWidth - baseCardWidth : 0);

    gsap.to(containerRef.current, {
      width: totalWidth,
      duration: 1,
      ease: "power3.inOut",
    });
  }, [expandedCard, isMobile, cards.length]);

  useEffect(() => {
    if (isMobile || !sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cardsEl = cardRefs.current;
      if (!cardsEl.length) return;

      const baseCardWidth = 374;
      const expandedCardWidth = 1162;
      const cardGap = 28;
      const padding = 160; // 80px left + 80px right

      // Helper to get fresh state during refresh without re-running effect
      const getMaxScroll = () => {
        const currentExpanded = expandedCardRef.current; // Use ref here
        const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        
        const calculatedTotalWidth =
          cards.length * baseCardWidth +
          (cards.length - 1) * cardGap +
          padding +
          (currentExpanded !== null ? expandedCardWidth - baseCardWidth : 0);

        return calculatedTotalWidth - viewportWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getMaxScroll()}`, // Use functional value
          scrub: 0.5, // Reduced scrub slightly for responsiveness
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on resize
        },
      });

      // Horizontal movement: Functional x value allows updating on refresh
      tl.to(containerRef.current, {
        x: () => -getMaxScroll(), // Use functional value
        ease: "none",
        duration: 1,
      });
    }, sectionRef);

    return () => {
      // Capture current X position before reverting to prevent jumps
      const currentX = gsap.getProperty(containerRef.current, "x");
      ctx.revert();
      gsap.set(containerRef.current, { x: currentX });
    };
  }, [cards.length, isMobile]); // Removed expandedCard dependency to prevent teardown

  return (
    <section
      ref={sectionRef}
      className={`relative w-full nnn  ${
        isMobile ? "py-12.5" : "min-h-screen py-20"
      }`}
    >
      <div
        className={`relative w-full ${
          isMobile
            ? ""
            : "h-screen flex items-center justify-start"
        }`}
      >
        <div
          ref={containerRef}
          className={`relative w-full overflow-visible ${
            isMobile ? "flex flex-col gap-8 pr-4" : "h-[700px]"
          }`}
          style={
            !isMobile
              ? {
                  // paddingLeft: "80px", // Handle via absolute positioning now
                  // paddingRight: "80px",
                  display: "flex",
                  gap: "28px",
                  position: "relative",
                  height: "100%" // Added height to ensure container fills parent
                }
              : {}
          }
        >
          {cards.map((item, i) => {
            const isExpanded = expandedCard === i;
            const baseCardWidth = 374;
            const cardGap = 28;
            const initialLeft = i * (baseCardWidth + cardGap);
            const zIndex = isExpanded ? 1000 : cards.length - i;

            return (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => handleToggle(i)}
                className={`${
                  isMobile ? "relative w-full!" : "absolute"
                } rounded-2xl bg-[#E1E9FF] flex flex-col p-3.5 ${item.color}`}
                style={
                  isMobile
                    ? {
                        width: "100%",
                        minHeight: isExpanded ? "initial" : "330px",
                      }
                    : {
                        width: `${baseCardWidth}px`,
                        minHeight: "306px",
                        top: `${i === 0 ? 35 : i * 120}px`,
                        left: `${80 + initialLeft}px`, // Added 80px offset
                        zIndex: zIndex,
                        transformOrigin: "left center",
                      }
                }
              >
                <div
                  className={`bg-[#001528] rounded-lg p-6 min-h-[300px] md:min-h-[278px] flex relative overflow-hidden ${
                    isMobile
                      ? isExpanded
                        ? "flex-col pr-0"
                        : "items-end"
                      : isExpanded
                      ? "items-start justify-between pr-0"
                      : "items-end"
                  }`}
                >
                  <button
                    className={`arrow-btn absolute sfsdf top-5 right-5 transition-all duration-300 z-20 ${
                      isExpanded ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(i);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                    >
                      <path
                        d="M28.4771 4.75266L17.5493 4.75261C17.1238 4.7197 16.7522 5.03791 16.7193 5.46343C16.6864 5.88889 17.0046 6.26054 17.4301 6.29341C17.4698 6.29646 17.5097 6.29651 17.5493 6.29341L26.6139 6.2989L4.98228 27.9305C4.68054 28.2323 4.68054 28.7216 4.98233 29.0233C5.28411 29.3251 5.77334 29.3251 6.07507 29.0233L27.7067 7.3917L27.7067 16.4508C27.6738 16.8763 27.992 17.2479 28.4175 17.2808C28.843 17.3137 29.2146 16.9955 29.2475 16.57C29.2506 16.5303 29.2506 16.4905 29.2475 16.4508V5.52296C29.2463 5.09811 28.9021 4.75393 28.4771 4.75266Z"
                        fill="#B6D1F0"
                      />
                    </svg>
                  </button>

                  {/* close */}
                  <button
                    className={`cross-btn absolute top-5 right-5 transition-all duration-300 z-20 ${
                      isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(i);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                    >
                      <path
                        d="M25.5 8.5L8.5 25.5M8.5 8.5L25.5 25.5"
                        stroke="#B6D1F0"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`${
                      isMobile ? "w-full" : isExpanded ? "w-[30%]" : ""
                    }`}
                  >
                    <h4
                      className={`text-2xl md:text-3xl text-[#FFBF3C] uppercase font-medium mb-3 ${
                        isExpanded && !isMobile ? "text-4xl" : ""
                      }`}
                    >
                      {item.title}
                    </h4>

                    <p className="text-sm text-white mb-3">{item.percent}</p>

                    <p
                      className={`text-sm text-white ${
                        isMobile
                          ? isExpanded
                            ? ""
                            : "line-clamp-2"
                          : isExpanded
                          ? "max-w-4xl"
                          : "max-w-sm line-clamp-2"
                      }`}
                    >
                      {item.desc}
                    </p>

                    {item?.btnText && item?.btnUrl && (
                      <div className="flex md:mt-5 mt-8">
                        <ButtonArrow
                          to={item.btnUrl}
                          text={item.btnText}
                          bgColor="#FFBF3C"
                          hoverColor="#1269CD"
                          textColor="#000"
                          hoverTextColor="#fff"
                          padding="pl-4 py-1 pr-1 w-full md:w-auto"
                          rounded="rounded-full"
                          textSize="text-base"
                        />
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <div
                      className={`w-full animate-fadeIn flex ${
                        isMobile ? "justify-center mt-6" : "pl-8 justify-end"
                      }`}
                    >
                      <Link to={item.url}>
                        <LazyImage
                          effect="blur"
                          src={item.image}
                          alt={item.alt}
                          wrapperClassName="block!"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealRight;
