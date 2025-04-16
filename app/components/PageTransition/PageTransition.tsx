"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ 
            opacity: 0.9,
            filter: "blur(4px)",
            rotateY: "1deg"
          }}
          animate={{ 
            opacity: 1,
            filter: "blur(0px)",
            rotateY: "0deg"
          }}
          exit={{ 
            opacity: 0.9,
            filter: "blur(4px)",
            rotateY: "-1deg"
          }}
          transition={{ 
            duration: 0.2, 
            ease: [0.21, 0.67, 0.25, 1.01]
          }}
          className="min-h-screen w-full transform-gpu"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}