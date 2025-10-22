import { useEffect, useState } from "react";

export default function Api() {
    // Initialisation avec un tableau vide pour stocker les données
    const [response, setResponse] = useState([{}, {}, {}, {}]);

    useEffect(() => {
        async function callApi() {
            try {
                // Authentification
                const authResponse = await fetch("https://api.happyhackers.fr/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include", // Important pour maintenir la session
                    mode: "cors",
                    body: JSON.stringify({
                        name: "dev-johann",
                        key: import.meta.env.VITE_API_KEY,
                    }),
                });

                if (!authResponse.ok) {
                    const authErrorText = await authResponse.text();
                    throw new Error(`Authentification échouée: ${authResponse.status}`);
                }

                // Récupération du corps de la réponse
                const authData = await authResponse.json();

                // Configuration des headers standard pour toutes les requêtes
                const headers = {
                    "Content-Type": "application/json"
                };

                // Récupération séquentielle des données pour garantir la cohérence
                const profil = await fetch("https://api.happyhackers.fr/profile?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include", // Important pour maintenir la session
                    mode: "cors",
                });

                if (!profil.ok) {
                    throw new Error(`Erreur profil: ${profil.status}`);
                }

                const skills = await fetch("https://api.happyhackers.fr/skills?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                    mode: "cors",
                });

                if (!skills.ok) {
                    throw new Error(`Erreur skills: ${skills.status}`);
                }

                const experience = await fetch("https://api.happyhackers.fr/experience?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                    mode: "cors",
                });

                if (!experience.ok) {
                    throw new Error(`Erreur experience: ${experience.status}`);
                }

                const projects = await fetch("https://api.happyhackers.fr/projects?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                    mode: "cors",
                });

                if (!projects.ok) {
                    throw new Error(`Erreur projects: ${projects.status}`);
                }

                // Traitement des réponses JSON
                try {
                    const [profilData, skillsData, experienceData, projectsData] = await Promise.all([
                        profil.json(),
                        skills.json(),
                        experience.json(),
                        projects.json()
                    ]);

                    // Mise à jour de l'état avec toutes les données récupérées
                    setResponse([profilData, skillsData, experienceData, projectsData]);
                } catch (error) {
                    setResponse([{}, {}, {}, {}]);
                }

            } catch (error) {
                setResponse([{}, {}, {}, {}]);
            }
        }

        callApi();
    }, []);

    return response;
}