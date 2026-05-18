import { motion } from "framer-motion";
import Title from "../components/Title";
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const teamMembers = [
  {
    name: "Himanshu Singh",
    role: "Co-Founder • CEO",
    image: "https://media.licdn.com/dms/image/v2/D4D35AQGmalT5j2U6hQ/profile-framedphoto-shrink_800_800/B4DZr1IydXJAAs-/0/1765049313756?e=1773320400&v=beta&t=Wrr-xMt21o2aGMtbIEyG7PpmPCgdN8GcgMHQZKApUo0",
    about:
      "Himanshu brings deep corporate and sales expertise to CraveNutri. With a strong understanding of market dynamics and customer behavior, he leads the company’s vision, partnerships, and strategic growth while building a brand that stands for trust, quality, and impact.",
    instagram: "https://www.instagram.com/himanshu74663045/",
    linkedin: "https://www.linkedin.com/in/himanshu-singh-054951210/",
    twitter: "",
    email: "mailto:himanshu804502@gmail.com",
  },
  {
    name: "Anuvanshika Saini",
    role: "Co-Founder • Product",
    image: "https://via.placeholder.com/300",
    about:
      "Anuvanshika drives the product vision at CraveNutri, focusing on building nutrition products that balance taste, health, and innovation. Her work ensures every product aligns with the brand’s mission of delivering clean, effective, and reliable nutrition.",
    instagram: "https://www.instagram.com/anuvanshika7/",
    linkedin: "https://www.linkedin.com/in/anuvanshika-goswami-044a67276/",
    twitter: "",
    email: "mailto:anuvanshika@cravenutri.com",
  },
  {
    name: "Dhruv Pal",
    role: "Co-Founder • Tech Head",
    image: "https://res.cloudinary.com/dqppqvblk/image/upload/v1762668962/dhruvpal_fd00uj.jpg",
    about:
      "Dhruv leads technology and digital innovation at CraveNutri. From building the ecommerce infrastructure to creating seamless user experiences, he focuses on scalable systems that power the company’s long-term digital growth.",
    instagram: "https://instagram.com/rock._dhruv_",
    linkedin: "https://linkedin.com/in/dhruv-pal-59b584253",
    twitter: "https://x.com/Dhruv_Pal0",
    email: "mailto:pal664908@gmail.com",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Team = () => {
  return (
    <>
      <SEO
        title="Our Team | CraveNutri"
        description="Meet the passionate team behind CraveNutri and our mission to deliver healthy nutrition products."
        url="https://cravenutri.com/team"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://cravenutri.com/" },
          { name: "About", url: "https://cravenutri.com/team" }
        ]}
      />
      <div className="min-h-screen bg-[#FFFBF7] py-16 px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <Title text1={"OUR"} text2={"TEAM"} />
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Meet the passionate people building CraveNutri — a brand committed to
            redefining nutrition with quality, innovation, and trust.
          </p>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardAnim}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-7 border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-[#FFFBF7]"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-orange-500 text-sm font-medium text-center mb-4">
                {member.role}
              </p>

              {/* About */}
              <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
                {member.about}
              </p>

              {/* Push icons to bottom */}
              <div className="mt-auto pt-4 border-t flex justify-center gap-4">

                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 transition"
                  >
                    <Instagram size={18} />
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition"
                  >
                    <Linkedin size={18} />
                  </a>
                )}

                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Twitter size={18} />
                  </a>
                )}

                {member.email && (
                  <a
                    href={member.email}
                    className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 transition"
                  >
                    <Mail size={18} />
                  </a>
                )}

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </>

  );
};

export default Team;