import React from "react";
import { motion } from 'framer-motion';
import { technologies } from '../constants/constants';
import { fadeIn, textVariant } from '../constants/motion';
// import { SectionWrapper } from "../hoc";

function Skills() {
    return (
        <div>
            <div className="flex flex-row justify-center items-center flex-wrap py-10 px-0 md:px-28 sm:px-80 gap-5">
                {technologies.map((tech, index) => (
                    <motion.div
                        variants={fadeIn("right", "spring", 0.1 * index, 2)}
                        className='w-20 sm:w-28 p-2 bg-[#464335DD] rounded-[10px]' key={tech.name}
                    >
                        <img src={tech.icon} />
                        <p className="text-center text-[0.6rem] sm:text-[0.8rem] text-white">{tech.name}</p>
                    </motion.div>   
                ))}
            </div>
        </div>
    )
}

export default Skills;