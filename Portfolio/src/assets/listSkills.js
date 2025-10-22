// Fonction pour transformer les données de l'API en skillsData
export function createSkillsData(apiSkills) {
    if (!apiSkills || !Array.isArray(apiSkills) || apiSkills.length === 0) {
        return skillsData_default; // Retourne les données par défaut si pas de données API
    }

    // Grouper les compétences par catégorie
    const categoriesMap = {};

    apiSkills.forEach(skill => {
        const category = skill.category;
        if (!categoriesMap[category]) {
            categoriesMap[category] = {
                skills: [],
                skillsWithDetails: [],
                description: null,
                icon: null,
                position: 999
            };
        }

        // Ajouter le nom de la compétence à la liste
        categoriesMap[category].skills.push(skill.skill_name);

        // Ajouter les détails complets de la compétence
        categoriesMap[category].skillsWithDetails.push({
            id: skill.id,
            name: skill.skill_name,
            level: skill.skill_level,
            description: skill.description || ''
        });

        // Récupérer la description et l'icône du premier skill qui en a
        if (skill.description && !categoriesMap[category].description) {
            categoriesMap[category].description = skill.description;
        }
        if (skill.icon && !categoriesMap[category].icon) {
            categoriesMap[category].icon = skill.icon;
        }

        // Utiliser la position la plus petite pour trier les catégories
        if (skill.position < categoriesMap[category].position) {
            categoriesMap[category].position = skill.position;
        }
    });

    // Convertir en tableau avec le format attendu et trier par position
    return Object.entries(categoriesMap)
        .map(([category, data]) => ({
            id: generateId(category),
            category: category,
            skills: data.skills,
            skillsWithDetails: data.skillsWithDetails,
            description: data.description || '',
            // Utiliser UNIQUEMENT l'icône de l'API
            icon: data.icon || '❓',
            position: data.position
        }))
        .sort((a, b) => a.position - b.position);
}

// Fonction pour générer un ID à partir du nom de catégorie
function generateId(category) {
    return category
        .toLowerCase()
        .normalize('NFD') // Décomposer les caractères accentués
        .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
        .replace(/[^a-z0-9]+/g, '-') // Remplacer les espaces et caractères spéciaux par des tirets
        .replace(/^-+|-+$/g, ''); // Supprimer les tirets au début et à la fin
}

// Données des compétences (fallback pendant le chargement)
const skillsData_default = [
    {
        id: 'loading',
        category: 'Chargement',
        skills: ['Chargement en cours...'],
        skillsWithDetails: [],
        description: 'Récupération des données depuis l\'API...',
        icon: '⏳',
        position: 0
    }
];

export default skillsData_default;