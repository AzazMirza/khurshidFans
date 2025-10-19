
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  Variants,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

// 👇 Container for staggering children
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

// 👇 Heading + paragraph slide from left
const textVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// 👇 Stats slide from bottom
const statVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50, 
      damping: 20,   
      duration: 1,
    },
  },
};


// 👇 Counter with "reset & animate" every scroll into view

const Counter = ({
  target,
  delay = 0,
  color = "text-white",
}: { target: number; delay?: number; color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const count = useMotionValue(0);

  const springValue = useSpring(count, { stiffness: 60, damping: 20 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));

    if (isInView) {
      count.set(0);
      // ✅ use framer-motion's animate function
      const controls = animate(0, target, {
        duration: 2,
        delay,
        ease: "easeOut",
        onUpdate: (v) => count.set(v),
      });

      return () => controls.stop();
    }

    return () => unsubscribe();
  }, [isInView, target, count, rounded, delay]);

  return (
    <motion.span
      ref={ref}
      className={`text-5xl font-semibold block ${color}`}
    >
      {display}%
    </motion.span>
  );
};


const Stats01Page = () => {
  return (
    <div className="flex items-center justify-center bg-[var(--nav-color)] border-t">
      <motion.div
        className="max-w-(--breakpoint-xl) mx-auto py-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // replay every time
      >
        {/* Heading + paragraph
        <motion.h2
          variants={textVariants}
          className="text-4xl md:text-5xl font-semibold tracking-tighter text-white"
        >
          Why Should You Choose Us?
        </motion.h2>
        <motion.p
          variants={textVariants}
          className="mt-4 text-xl text-white"
        >
          Because after switching to us...
        </motion.p> */}

        {/* Stats */}
        <motion.div
          className="  grid grid-cols-1 md:grid-cols-3 gap-x-12  justify-center"
          variants={containerVariants}
        >
          <motion.div className="max-w-3xs mx-auto" variants={statVariants}>
            <Counter target={60} delay={0} color="text-yellow-400" />
            <p className="mt-6 text-lg text-white">
              Electricity saved by Super energy efficient BLDC motor than conventional AC Fans.
            </p>
          </motion.div>

          <motion.div className="max-w-3xs mx-auto" variants={statVariants}>
            <Counter target={0} delay={0.5} color="text-yellow-400" />
            <p className="mt-6 text-lg text-white">
              Heat Emission from our BLDC motor. Which results in cooler air delivery.
            </p>
          </motion.div>

          <motion.div className="max-w-3xs mx-auto" variants={statVariants}>
            <Counter target={60} delay={1} color="text-yellow-400" />
            <p className="mt-6 text-lg text-white">
              Electricity saved by Super energy efficient BLDC motor than conventional AC Fans.
            </p>
          </motion.div>
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Stats01Page;







// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   animate,
//   motion,
//   Variants,
//   useMotionValue,
//   useSpring,
//   useTransform,
//   useInView,
// } from "framer-motion";

// // 👇 Container for staggering children
// const containerVariants: Variants = {
//   hidden: { opacity: 1 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.3,
//     },
//   },
// };

// // 👇 Heading + paragraph slide from left
// const textVariants: Variants = {
//   hidden: { opacity: 0, x: -100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
//   },
// };

// // 👇 Stats slide from bottom
// const statVariants: Variants = {
//   hidden: { opacity: 0, y: 100 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 50, 
//       damping: 20,   
//       duration: 1,
//     },
//   },
// };


// // 👇 Counter with "reset & animate" every scroll into view

// const Counter = ({
//   target,
//   delay = 0,
//   color = "text-white",
// }: { target: number; delay?: number; color?: string }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.5 });
//   const count = useMotionValue(0);

//   const springValue = useSpring(count, { stiffness: 60, damping: 20 });
//   const rounded = useTransform(springValue, (latest) => Math.round(latest));
//   const [display, setDisplay] = useState(0);

//   useEffect(() => {
//     const unsubscribe = rounded.on("change", (v) => setDisplay(v));

//     if (isInView) {
//       count.set(0);
//       // ✅ use framer-motion's animate function
//       const controls = animate(0, target, {
//         duration: 1,
//         delay,
//         ease: "easeOut",
//         onUpdate: (v) => count.set(v),
//       });

//       return () => controls.stop();
//     }

//     return () => unsubscribe();
//   }, [isInView, target, count, rounded, delay]);

//   return (
//     <motion.span
//       ref={ref}
//       className={`text-5xl font-semibold block ${color}`}
//     >
//       {display}%
//     </motion.span>
//   );
// };


// const Stats01Page = () => {
//   return (
//     <div className="flex items-center justify-center bg-[var(--nav-color)] border-t">
//       <motion.div
//         className="max-w-(--breakpoint-xl) mx-auto py-12 text-center"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false, amount: 0.3 }} // replay every time
//       >
//         {/* Heading + paragraph */}
//         <motion.h2
//           variants={textVariants}
//           className="text-4xl md:text-5xl font-semibold tracking-tighter text-white"
//         >
//           Why Should You Choose Us?
//         </motion.h2>
//         <motion.p
//           variants={textVariants}
//           className="mt-4 text-xl text-white"
//         >
//           Because after switching to us...
//         </motion.p>

//         {/* Stats */}
//         <motion.div
//           className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 justify-center"
//           variants={containerVariants}
//         >
//           <motion.div className="max-w-3xs mx-auto" variants={statVariants}>
//             <Counter target={60} delay={0} color="text-yellow-400" />
//             <p className="mt-6 text-lg text-white">
//               Electricity saved by Super energy efficient BLDC motor than conventional AC Fans.
//             </p>
//           </motion.div>

//           <motion.div className="max-w-3xs mx-auto" variants={statVariants}>
//             <Counter target={0} delay={0.5} color="text-yellow-400" />
//             <p className="mt-6 text-lg text-white">
//               Heat Emission from our BLDC motor. Which results in cooler air delivery.
//             </p>
//           </motion.div>

//           <motion.div className="max-w-3xs mx-auto" variants={statVariants}>
//             <Counter target={60} delay={1} color="text-yellow-400" />
//             <p className="mt-6 text-lg text-white">
//               Electricity saved by Super energy efficient BLDC motor than conventional AC Fans.
//             </p>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Stats01Page;