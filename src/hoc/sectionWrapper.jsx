import { motion } from "framer-motion";
import React from "react";
import { staggerContainer } from "../constants/motion";

const SectionWrapper = (Component, idName) => function HOC() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const viewportAmount = isMobile ? 0.1 : 0.2;

    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
        >
            <span id={idName}></span>
            <Component />
        </motion.section>
    )
}

export default SectionWrapper;
