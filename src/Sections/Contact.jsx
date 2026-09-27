import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../constants/motion";

function Contacts() {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: [value] })
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
            })
        }, (error) => {
            setLoading(false)
            console.log(error);
            alert('Something went wrong, try again later')
        })
    }
    return (
        <div className="bg-primary mt-100 w-full py-10 px-10 sm:px-40 min-h-screen">
            <motion.div variants={textVariant()}>
                <motion.h1 className='text-textlight text-5xl sm:text-9xl font-semibold text-center p-8 z-20'>GET IN TOUCH</motion.h1>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-12 flex flex-col gap-8"
                >
                    <label className="flex flex-col">
                        <span className="text-textlight font-medium mb-4">Your Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="bg-transparent py-4 px-6 text-textlight rounded-lg outline-none focus:outline-none border-[3px] border-[#bebea0] font-medium"
                            required
                        ></input>
                    </label>
                    <label className="flex flex-col">
                        <span className="text-textlight font-medium mb-4">Your Email</span>
                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="bg-transparent py-4 px-6 text-textlight rounded-lg outline-none focus:outline-none border-[3px] border-[#bebea0] font-medium"
                            required
                        ></input>
                    </label>
                    <label className="flex flex-col">
                        <span className="text-textlight font-medium mb-4">Your Message</span>
                        <textarea
                            rows="7"
                            type="text"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What's your message?"
                            className="bg-transparent py-4 px-6 text-textlight rounded-lg outline-none focus:outline-none border-[3px] border-[#bebea0] font-medium"
                            required
                        ></textarea>
                    </label>
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="bg-textlight py-3 px-8 outline-none w-fit text-[24px] text-white font-bold rounded-xl hover:scale-110"
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Contacts, "contact");