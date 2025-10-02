import handyman1 from "../assets/handyman1.png";

export const serviceMascots = {
  handyman: {
    name: "Handy Hank",
    imageUrl: handyman1,
    scale: 0.014,
    position: [0, -1, 0],
    description: "Our friendly handyman mascot",
  },
};

// Helper function to get mascot by service name
export const getMascotForService = (serviceName) => {
  const normalizedName = serviceName.toLowerCase().trim();
  return (
    serviceMascots[normalizedName] || {
      name: "Mystery Mascot",
      imageUrl: handyman1,
      description: "Our friendly helper",
    }
  );
};

// Get all mascots
export const getAllMascots = () => {
  return Object.values(serviceMascots);
};
