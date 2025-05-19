"use client";

// import { useTransition } from "@react-spring/web";
// import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  // const pathname = usePathname();

  // Smooth blur transition effect
  // const transitions = useTransition(pathname, {
  //   from: { 
  //     opacity: 0,
  //     filter: "blur(8px)",
  //     position: "absolute",
  //     width: "100%"
  //   },
  //   enter: { 
  //     opacity: 1,
  //     filter: "blur(0px)",
  //     position: "relative",
  //     width: "100%" 
  //   },
  //   leave: { 
  //     opacity: 0,
  //     filter: "blur(8px)",
  //     position: "absolute",
  //     width: "100%"
  //   },
  //   config: { 
  //     duration: 300 
  //   },
  //   exitBeforeEnter: false
  // });

  return (
    <div className="overflow-hidden relative">
      {/* {transitions((style, item) => (
        item === pathname && (
          <animated.div
            style={style}
            className="w-full min-h-screen will-change-opacity"
          >
          </animated.div>
          )
          ))} */}
          {children}
    </div>
  );
}