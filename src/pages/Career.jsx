import { motion } from "framer-motion";
import ApplicationForm from "../components/ApplicationForm";
import working from "../assets/laptop.png";
import Mascot from "../ui/Mascot";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="bg-gradient-to-r from-[#6017B4]/80 
      py-30 to-[#8B2CE2]/80 border-t border-purple-900/30
       text-white px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-tagesschrift font-bold mb-4"
        >
          Build Your Career with JiffyFox
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl max-w-2xl mx-auto"
        >
          Join our team of professionals delivering exceptional home and
          business services
        </motion.p>{" "}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 relative"
        >
          {/* Header and Mascot Container */}
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="text-3xl font-bold text-[#6017B4] mb-6 text-center">
              Why Join Our Team?
            </h2>
            <div className="relative w-full flex justify-center -mt-4 mb-2">
              <Mascot
                src={working}
                marginTop="mt-0"
                marginBottom="mb-0"
                alt="Team collaboration mascot"
                size="w-40 md:w-48"
                className="z-10"
              />
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              {
                title: "Competitive Benefits",
                desc: "Health insurance, retirement plans, and performance bonuses",
                icon: "💰",
              },
              {
                title: "Growth Opportunities",
                desc: "Clear career paths and professional development programs",
                icon: "📈",
              },
              {
                title: "Flexible Scheduling",
                desc: "Work arrangements that fit your lifestyle",
                icon: "⏰",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#6017B4] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Application Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#6017B4] to-[#8B2CE2] text-white p-6">
            <h2 className="text-2xl font-bold">
              Professional Application Form
            </h2>
            <p>
              Please complete all required fields to submit your application
            </p>
          </div>

          <ApplicationForm />
        </motion.section>
      </div>
    </div>
  );
};

export default Careers;
