import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";
import AnnouncementBar from "../components/AnnouncementBar";
import CraveNutriInfo from "../components/CraveNutriInfo";

const Home = () => {
  return (
    <div>
      <AnnouncementBar />
      <Hero />
      <LatestCollection />
      {/* <BestSeller /> */}
      <CraveNutriInfo />
      {/* <OurPolicy /> */}
      {/* <NewsLetter /> */}
    </div>
  );
};

export default Home;
