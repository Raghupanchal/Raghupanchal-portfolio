import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { education } from "../constants/constants";

const EducationCard = ({ education }) => {
    return (
        <VerticalTimelineElement
            contentStyle={{ background: '#D9D6B277', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #D9D6B277' }}
            date={education.date}
            iconStyle={{ background: '#FFFF99' }}
            position="right"
        >
            <div>
                <h3 className="text-white text-[24px] font-bold">{education.degree}</h3>
                <p className="text- text-[20px] font-semibold" style={{ margin: 0 }}>{education.title}, {education.place_name}</p>
                <p className="text-secondary text-[12px] font-semibold mt-5">{education.grade}</p>
            </div>
        </VerticalTimelineElement>
    )
}

function Education() {
    return(
        <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
            {education.map((edu, index) => (
                <EducationCard
                    key={`education-${index}`}
                    education={edu}
                />
            ))}
        </VerticalTimeline>
    </div>
    )
}

export default Education;