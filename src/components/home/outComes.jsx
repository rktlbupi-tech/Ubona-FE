import React from "react";
import ScrollReveal from "../animation/ScrollReveal";
import { ScrollCards } from "../../static/homeData";
function OutComes() {
  return (
    <div className="pb-24 px-8">
      <ScrollReveal cards={ScrollCards} />
    </div>
  );
}
export default OutComes;