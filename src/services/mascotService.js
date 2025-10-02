import { getMascotForService } from "../data/Mascots.js";

// Simulate API fetch delay
const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get mascot for a service
export const fetchServiceMascot = async (serviceName) => {
  // network request delay
  await simulateDelay(200);

  // Return the hardcoded mascot data
  return getMascotForService(serviceName);
};

// Get all mascots
export const fetchAllMascots = async () => {
  await simulateDelay(500);

  return Object.entries(serviceMascots).map(([service, mascot]) => ({
    service,
    ...mascot,
  }));
};
