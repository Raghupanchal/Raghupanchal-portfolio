import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../constants/motion";
import SendIcon from '@mui/icons-material/Send';

function Contacts() {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs.send(
            'service_u3zm2ie',
            'template_jfd95cl',
            {
                from_name: form.name,
                to_name: 'Raghu Panchal',
                from_email: form.email,
                to_email: 'raghupanchal21@gmail.com',
                message: form.message,
                reply_to: form.email,
            },
            'm9YsBuIozkA2FvSzE'
        ).then(() => {
            setLoading(false);
            alert("Thank you for messaging, I'll reply soon :)");
            setForm({
                name: '',
                email: '',
                message: '',
            });
        }, (error) => {
            setLoading(false);
            console.log(error);
            alert('Something went wrong, try again later');
        });
    };

    return (
        <div className="bg-primary w-full py-8 sm:py-16 pb-8 sm:pb-12 px-4 xs:px-6 sm:px-12 md:px-20 max-w-5xl mx-auto">
            <motion.div variants={textVariant()}>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-textlight text-3xl xs:text-4xl sm:text-7xl md:text-8xl font-semibold text-center p-1 sm:p-4 z-20'
                >
                    GET IN TOUCH
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center text-textlight/70 text-xs xs:text-sm sm:text-base mt-1 mb-6 sm:mb-10 max-w-lg mx-auto"
                >
                    Have a project in mind, an opportunity, or just want to say hi? Drop a message below.
                </motion.p>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 sm:gap-6 max-w-2xl mx-auto"
                >
                    <label className="flex flex-col">
                        <span className="text-textlight text-xs xs:text-sm font-semibold mb-1.5 sm:mb-2">Your Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Alex Smith"
                            className="bg-white/50 backdrop-blur-sm py-2.5 sm:py-3.5 px-3.5 sm:px-5 text-sm sm:text-base text-textlight rounded-xl outline-none focus:outline-none border-2 border-[#bebea0]/70 focus:border-[#262010] font-medium transition-all shadow-sm"
                            required
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-textlight text-xs xs:text-sm font-semibold mb-1.5 sm:mb-2">Your Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="alex@example.com"
                            className="bg-white/50 backdrop-blur-sm py-2.5 sm:py-3.5 px-3.5 sm:px-5 text-sm sm:text-base text-textlight rounded-xl outline-none focus:outline-none border-2 border-[#bebea0]/70 focus:border-[#262010] font-medium transition-all shadow-sm"
                            required
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-textlight text-xs xs:text-sm font-semibold mb-1.5 sm:mb-2">Your Message</span>
                        <textarea
                            rows="4"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What would you like to discuss?"
                            className="bg-white/50 backdrop-blur-sm py-2.5 sm:py-3.5 px-3.5 sm:px-5 text-sm sm:text-base text-textlight rounded-xl outline-none focus:outline-none border-2 border-[#bebea0]/70 focus:border-[#262010] font-medium transition-all shadow-sm resize-none"
                            required
                        />
                    </label>

                    <div className="flex justify-center items-center mt-2 sm:mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 bg-[#262010] py-2.5 sm:py-3 px-7 sm:px-9 outline-none w-full xs:w-auto text-sm sm:text-base text-[#F0EFE8] font-bold rounded-xl hover:bg-[#3d382b] active:scale-95 transition-all shadow-xl cursor-pointer disabled:opacity-60"
                        >
                            <span>{loading ? 'Sending...' : 'Send Message'}</span>
                            <SendIcon style={{ fontSize: 16 }} className={loading ? 'animate-pulse' : ''} />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default SectionWrapper(Contacts, "contact");