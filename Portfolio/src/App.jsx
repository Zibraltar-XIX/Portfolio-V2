import React, { useEffect, useState, useMemo } from 'react';
import mePhoto from './assets/me.jpg';
import Experience from './components/experience.jsx';
import SkillsButton from './components/skillsButton.jsx';
import SkillsDetails from './components/skillsDetails.jsx';
import { createSkillsData } from './assets/listSkills.js';
import Api from "./components/Api.jsx";

function App() {

  // State pour la catégorie active
  const [activeSkill, setActiveSkill] = useState(null);

  // State pour le scroll de la flèche
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AllData = Api();

  // On utilise l'opérateur de coalescence nulle pour éviter undefined
  const profil = AllData[0] || {};
  const skillsApiData = AllData[1] || [];
  const experienceData = AllData[2] || [];
  const projects = AllData[3] || {};

  const DescriptionProfil = profil.description || "Chargement";
  const Description = profil.long_description || "Chargement";

  // Utiliser useMemo pour éviter de recalculer à chaque rendu
  const skillsData = useMemo(() => {
    return createSkillsData(skillsApiData);
  }, [skillsApiData]);

  return (
    <div className="App">

      {/* Premier bloc - Présentation */}
      <div className="bloc1">

          <div className="hero-image">
              <div className="profile-card">
                  <img className="profile-photo" src={mePhoto} alt="JP" />
                  <div className="profile-info">
                      <h3>Johann PAROLA</h3>
                      <p>{DescriptionProfil}</p>
                  </div>
              </div>
          </div>

        <div className="hero-text">
            <h1><span className="highlight">Étudiant spécialisé en cybersécurité</span></h1>
            <div className="description">{Description}</div>
            <a href="mailto:contact@johannparola.fr" className="btn-contact">Me contacter</a>
        </div>

        <div 
          className="arrow"
          style={{
            opacity: isScrolled ? 0 : 1,
            transform: `translateY(${isScrolled ? '20px' : '0'})`,
            transition: 'all 0.4s ease'
          }}
        ></div>
      </div>


      {/* Deuxième bloc - Compétences */}
      <div className="secondary-block">
        <h1>Compétences</h1>
        <div className="skills-container">
          <div className="categories-list">
              <SkillsButton
                  skillsData={skillsData}
                  activeSkill={activeSkill}
                  setActiveSkill={setActiveSkill}
              />
          </div>
          
          {activeSkill && (
            <div className="skill-details">
              <SkillsDetails
                  activeSkill={activeSkill}
              />
            </div>
          )}
          
          {!activeSkill && (
            <div className="skill-placeholder">
              <div className="placeholder-icon">👆</div>
              <p>Survolez une catégorie pour découvrir mes compétences</p>
            </div>
          )}
        </div>
      </div>


      {/* Troisième bloc - Expériences */}
      <div className="secondary-block">
        <h1>Expériences</h1>
        <div className="experiences-container">
          {experienceData && experienceData.length > 0 ? (
            experienceData.map((exp, index) => (
              <Experience
                key={index}
                icon={exp.icon || "�"}
                title={exp.role || "Non spécifié"}
                company={exp.company || "Non spécifiée"}
                period={exp.duration || "Période non spécifiée"}
                description={exp.details || "Aucune description"}
                technologies={exp.skills ? exp.skills.split(", ").filter(skill => skill.trim() !== "") : []}
              />
            ))
          ) : (
            <p>Aucune expérience disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
