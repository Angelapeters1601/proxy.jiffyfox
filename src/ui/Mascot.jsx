import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchServiceMascot } from "../services/mascotService";

const Mascot = ({
  serviceName,
  src,
  alt = "Service Mascot",
  className = "",
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  whileHover = { scale: 1.1, rotate: 5 },
  whileTap = { scale: 0.95 },
  size = "w-30",
  marginTop = "-mt-8",
  marginBottom = "mb-4",
  rounded = "rounded-2xl",
  showName = false,
  dropShadow = "drop-shadow-2xl",
}) => {
  const [avatarUrl, setAvatarUrl] = useState(src);
  const [mascotName, setMascotName] = useState("");
  const [isLoading, setIsLoading] = useState(!src);

  useEffect(() => {
    const loadMascot = async () => {
      if (serviceName && !src) {
        setIsLoading(true);
        try {
          const mascotData = await fetchServiceMascot(serviceName);
          setAvatarUrl(mascotData.imageUrl);
          setMascotName(mascotData.name);
        } catch (error) {
          console.error("Error loading mascot:", error);
          // Fallback to default image
          setAvatarUrl("/default-mascot.png");
        } finally {
          setIsLoading(false);
        }
      } else if (src) {
        // Use direct src if provided
        setAvatarUrl(src);
        setIsLoading(false);
      }
    };

    loadMascot();
  }, [serviceName, src]);

  if (isLoading) {
    return (
      <div
        className={`
          ${size} 
          ${marginTop} 
          ${marginBottom} 
          ${rounded} 
          mx-auto 
          ${dropShadow}
          animate-pulse
          ${className}
        `.trim()}
      />
    );
  }

  return (
    <div className={`text-center ${marginTop} ${marginBottom}`}>
      <motion.img
        src={avatarUrl}
        alt={alt}
        className={`
          ${size} 
          ${rounded} 
          mx-auto 
          shadow-lg
          ${className}
        `.trim()}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={whileHover}
        whileTap={whileTap}
        onError={(e) => {
          // Fallback if image fails to load
          e.target.src = "/handyman1.png";
        }}
      />
      {showName && mascotName && (
        <p className="mt-2 text-sm font-medium text-gray-700">{mascotName}</p>
      )}
    </div>
  );
};

Mascot.propTypes = {
  serviceName: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  initial: PropTypes.object,
  animate: PropTypes.object,
  transition: PropTypes.object,
  whileHover: PropTypes.object,
  whileTap: PropTypes.object,
  size: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  rounded: PropTypes.string,
  showName: PropTypes.bool,
};

export default Mascot;
