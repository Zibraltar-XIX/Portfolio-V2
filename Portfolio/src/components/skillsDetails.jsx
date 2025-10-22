import '../css/skills.css'
import React from "react";

function SkillsDetails({activeSkill}) {
    return (
        <>
            <div className="skill-header">
                <span className="skill-icon-large">{activeSkill.icon}</span>
                <h3>{activeSkill.category}</h3>
            </div>
            <p className="skill-description">{activeSkill.description}</p>
            <div className="skills-list">
                {activeSkill.skills.map((tech, index) => (
                    <span key={index} className="skill-tag">
                        {tech}
                    </span>
                ))}
            </div>
        </>
    )
}

export default SkillsDetails;