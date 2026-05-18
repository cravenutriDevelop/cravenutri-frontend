import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import AnnouncementBar from "../components/AnnouncementBar";
import CraveNutriInfo from "../components/CraveNutriInfo";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const Home = () => {
  return (
    <>
      <SEO
        title="Crave Nutri – Premium Healthy Snacks in India"
        description="Discover premium healthy snacks and wellness products at Crave Nutri. Explore products designed for fitness, immunity, and overall well-being."
        url="https://cravenutri.com/"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://cravenutri.com/" },
          // { name: "Collection", url: "https://cravenutri.com/" }
        ]}
      />

      <div>
        {/* Main H1 */}
        <h1 className="hidden">
          Crave Nutri Premium Healthy Snacks in India
        </h1>

        <AnnouncementBar />
        <Hero />
        <LatestCollection />
        {/* <BestSeller /> */}
        <CraveNutriInfo />
        {/* <OurPolicy /> */}
        {/* <NewsLetter /> */}
      </div>
    </>
  );
};

export default Home;