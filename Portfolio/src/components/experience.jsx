import '../css/experience.css'
import React from "react";

function Experience({icon, title, company, period, description, technologies}) {
    return (

        <div className="experience-card">
            <div className="experience-header">
                <span className="experience-icon">{icon}</span>
                <div className="experience-title-section">
                    <h3>{title}</h3>
                    <p className="experience-company">{company}</p>
                    <span className="experience-period">{period}</span>
                </div>
            </div>
            <p className="experience-description">{description}</p>
            <div className="experience-technologies">
                {technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                {tech}
              </span>
                ))}
            </div>
        </div>

    )
}

export default Experience;