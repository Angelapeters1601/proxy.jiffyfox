import * as React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo1.jpg";

// Motion components
const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);

export default function AnimatedNavbar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "Services", href: "https://jiffyfox.com/services" },
    { text: "Projects", href: "https://jiffyfox.com/projects" },
    { text: "Clients", href: "https://jiffyfox.com/clients" },
    { text: "About", href: "https://jiffyfox.com/about" },
    { text: "Contact", href: "https://jiffyfox.com/contact" },
    { text: "Help", href: "https://jiffyfox.com/help" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50
     bg-[#6017B4]/50 text-white shadow-md"
    >
      <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="https://jiffyfox.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-shrink-0"
        >
          <img
            src={logo}
            alt="jiffyfox logo"
            className="w-24 h-8 sm:w-30 sm:h-10 rounded-full object-contain bg-white p-1 shadow-lg"
          />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-4 xl:space-x-6 items-center">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative px-2 py-1 font-medium text-sm sm:text-base ${
                window.location.href === link.href
                  ? "text-[#E9D5FF]"
                  : "text-white hover:text-[#E9D5FF]"
              }`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {link.text}
              {window.location.href === link.href && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E9D5FF]"
                  layoutId="activeLink"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Tablet Nav (768px-1024px) */}
        <nav className="hidden md:flex lg:hidden space-x-2 items-center">
          {navLinks.slice(0, 4).map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative px-1 py-1 font-medium text-xs sm:text-sm ${
                window.location.href === link.href
                  ? "text-[#E9D5FF]"
                  : "text-white hover:text-[#E9D5FF]"
              }`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {link.text}
              {window.location.href === link.href && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E9D5FF]"
                  layoutId="activeLink"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="https://jiffyfox.com/help"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative px-1 py-1 font-medium text-xs sm:text-sm ${
              window.location.href === "https://jiffyfox.com/help"
                ? "text-[#E9D5FF]"
                : "text-white hover:text-[#E9D5FF]"
            }`}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            Help
            {window.location.href === "https://jiffyfox.com/help" && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E9D5FF]"
                layoutId="activeLink"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MotionIconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MenuIcon fontSize="medium" />
          </MotionIconButton>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "#6017B4",
                  color: "white",
                  width: "75vw",
                  maxWidth: "320px",
                },
              }}
            >
              <MotionBox
                initial={{ x: "100%" }}
                animate={{
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.5,
                  },
                }}
                exit={{
                  x: "100%",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  },
                }}
                className="h-full relative"
              >
                {/* Close Button */}
                <MotionIconButton
                  onClick={toggleDrawer(false)}
                  color="inherit"
                  className="absolute top-3 left-65"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <CloseIcon fontSize="medium" />
                </MotionIconButton>

                <List className="pt-16">
                  {navLinks.map((link) => (
                    <ListItem key={link.href} disablePadding>
                      <ListItemButton
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={toggleDrawer(false)}
                        sx={{
                          py: 2,
                          backgroundColor:
                            window.location.href === link.href
                              ? "rgba(233, 213, 255, 0.15)"
                              : "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <ListItemText
                            primary={link.text}
                            primaryTypographyProps={{
                              fontWeight: "medium",
                              fontSize: "1.1rem",
                              color:
                                window.location.href === link.href
                                  ? "#E9D5FF"
                                  : "white",
                            }}
                          />
                          {window.location.href === link.href && (
                            <motion.div
                              className="h-0.5 bg-[#E9D5FF] mt-1"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </MotionBox>
            </Drawer>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
