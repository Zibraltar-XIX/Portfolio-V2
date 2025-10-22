import '../css/skills.css'
import React from 'react';

function SkillsButton({ skillsData, activeSkill, setActiveSkill }) {
    return (
        <>
            {skillsData.map((skill) => (
                <button
                    key={skill.id}
                    className={`categories ${activeSkill?.id === skill.id ? 'active' : ''}`}
                    onMouseEnter={() => setActiveSkill(skill)}
                >
                    <span className="skill-icon">{skill.icon}</span>
                    {skill.category}
                </button>
            ))}
        </>
    );
}

export default SkillsButton;