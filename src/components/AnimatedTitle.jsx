import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion, easeOut, easeInOut } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Styled motion component for Character
const Character = styled(motion.span)`
  display: inline-block;
  white-space: pre;
`;

export default function AnimatedTitle({ text }) {
  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    } else {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  // Function to generate animation variants with delay for each character
  const getCharacterAnimation = (index) => ({
    hidden: {
      opacity: 0,
      y: `0.5rem`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.7,
        delay: index * 0.15, // Adjust delay multiplier for desired effect
        ease: easeInOut
      },
    },
  });

  return (
    <motion.h2 ref={ref} aria-label={text} role="heading" className="text-textdark1 text-5xl sm:text-8xl font-semibold text-center p-0 sm:p-8 z-20">
      {text.split("").map((character, index) => (
        <Character
          key={index}
          initial="hidden"
          animate={ctrls}
          variants={getCharacterAnimation(index)}
          aria-hidden="true"
        >
          {character}
        </Character>
      ))}
    </motion.h2>
  );
}
