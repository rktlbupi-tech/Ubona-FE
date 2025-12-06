import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";

const API_BASE = import.meta.env.VITE_PAYLOAD_API_URL || "http://localhost:3011";
function generateLoopSlides(arr, minCount = 30) {
  if (!arr || arr.length === 0) return [];
  const result = [];
  while (result.length < minCount) {
    result.push(...arr);
  }
  return result.slice(0, minCount);
}
const LogoSliderTabs = () => {
  const tabsContainerRef = useRef(null);
  const tabs = [
    { id: "all", label: "All Clients" },
    { id: "finance", label: "Banking & Finance" },
    { id: "insurance", label: "Insurance" },
    { id: "marketplace", label: "Marketplaces & E-commerce" },
    { id: "enterprise", label: "Other Large Enterprises" },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [logos, setLogos] = useState({
    all: [],
    finance: [],
    insurance: [],
    marketplace: [],
    enterprise: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    async function fetchLogos() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE}/api/client-logos?limit=1000&sort=order`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch logos: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Group logos by category
        const groupedLogos = {
          all: [],
          finance: [],
          insurance: [],
          marketplace: [],
          enterprise: [],
        };

        if (data.docs && Array.isArray(data.docs)) {
          data.docs.forEach((logo) => {
            const category = logo.category || "all";
            const logoData = {
              id: logo.id,
              src: logo.logo?.url 
                ? (logo.logo.url.startsWith('http') 
                    ? logo.logo.url 
                    : `${API_BASE}${logo.logo.url}`)
                : "",
              name: logo.name || "",
            };

            // Add to specific category
            if (groupedLogos[category] && category!='all') {
              groupedLogos[category].push(logoData);
            }
            
            // Also add to "all" category
            groupedLogos.all.push(logoData);
          });
        }

        setLogos(groupedLogos);
      } catch (err) {
        console.error("Error fetching logos:", err);
        setError(err.message);
        // Fallback to empty arrays if fetch fails
        setLogos({
          all: [],
          finance: [],
          insurance: [],
          marketplace: [],
          enterprise: [],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchLogos();
  }, []);

  const rawLogos = logos[activeTab] || [];
  const currentLogos = generateLoopSlides(rawLogos, 30);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}      
      whileInView={{ opacity: 1, y: 0 }}    
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} 
    >
      <div className="w-full pt-13 bg-white">
        <div className="flex justify-center items-center mb-8.5 gap-6 px-4 md:px-0">
          <div className="h-[2px] md:w-28 w-16 bg-linear-to-r from-white to-[#1269CD]"></div>
          <p className="text-sm text-[#1269CD] font-medium tracking-wider text-center">Trusted By</p>
          <div className="h-[2px] md:w-28 w-16 bg-linear-to-r from-[#1269CD] to-white"></div>
        </div>
        {/* Tabs */}
        <div className="flex justify-center mb-8 px-4 md:px-0">
          <div ref={tabsContainerRef}
          className="gap-3 flex md:justify-center flex-nowrap overflow-x-auto scrollbar-hide border border-[#D0D0D0] rounded-[52px] p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  setActiveTab(tab.id);
                  // 👇 Scroll to start on mobile
                  if (window.innerWidth < 768 && tabsContainerRef.current) {
                    const tabElement = e.currentTarget; // clicked button
                    const container = tabsContainerRef.current;
                    // Scroll so clicked tab aligns at start
                    const scrollLeft = tabElement.offsetLeft - container.offsetLeft - 8; // small padding
                    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
                  }
                }}
                className={`relative whitespace-nowrap cursor-pointer px-3 py-2 rounded-full text-sm font-normal transition-all duration-300 
                  ${
                    activeTab === tab.id
                      ? "bg-[#BBDBFF]/40 text-[#1269CD]"
                      : "bg-white text-[#575757] hover:text-[#1269CD]"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-full bg-[#BBDBFF]/40 opacity-10 z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        {/* Slider Section with Smooth Transition */}
        <div className="bg-[#F2F2F2] py-8 px-4 xl:px-12 2xl:px-22">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-[#575757]">Loading logos...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-red-500">Error loading logos: {error}</p>
            </div>
          ) : currentLogos.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-[#575757]">No logos available for this category</p>
            </div>
          ) : (
            <div
              className=""
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Autoplay]}
                    spaceBetween={15}
                    loop={true}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                    }}
                    speed={3000}
                    allowTouchMove={false}
                    breakpoints={{
                      320: { slidesPerView: 2, spaceBetween: 20 },
                      640: { slidesPerView: 3, spaceBetween: 30 },
                      768: { slidesPerView: 4, spaceBetween: 30 },
                      1024: { slidesPerView: 6, spaceBetween: 40 },
                    }}
                    className="select-none logo-tab-slider"
                  >
                    {currentLogos.map((logo, index) => (
                      <SwiperSlide key={logo.id || index} className="flex justify-center items-center">
                        <motion.div
                          className="h-18.5 md:h-28 bg-white rounded-xl pt-4 md:pt-6 px-7 pb-3 flex flex-col justify-center items-center gap-y-4.5 md:gap-y-6.5"
                        >
                          <motion.div className="flex items-center justify-center h-6 md:h-10">
                            <img
                              src={logo.src}
                              alt={logo.name}
                              className="max-h-full object-contain transition duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </motion.div>
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[8px] md:text-xs text-center text-[#5B5B5B] font-normal"
                          >
                            {logo.name}
                          </motion.p>
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LogoSliderTabs;