import { useEffect, useState } from "react";

export default function Api() {
    // Initialisation avec un tableau vide pour stocker les données
    const [response, setResponse] = useState([{}, {}, {}, {}]);

    useEffect(() => {
        async function callApi() {
            console.log("Début de l'appel API");
            console.log("Clé API utilisée:", import.meta.env.VITE_API_KEY ? "Présente" : "Absente");

            try {
                // Log cookies accessibles via JS (ne montre pas les cookies HttpOnly)
                console.log("Cookies avant authentification (document.cookie):", document.cookie);

                // Authentification
                console.log("Tentative d'authentification...");
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

                console.log("Réponse authentification:", {
                    status: authResponse.status,
                    statusText: authResponse.statusText
                });

                // Affiche tous les headers reçus (note: 'set-cookie' n'est pas lisible en fetch dans le navigateur)
                console.log("Headers de réponse:");
                for (const pair of authResponse.headers.entries()) {
                    console.log(" -", pair[0] + ":", pair[1]);
                }

                // Tentative explicite de lecture du header Set-Cookie (sera null en navigateur pour des raisons de sécurité)
                try {
                    const setCookieHeader = authResponse.headers.get('set-cookie');
                    console.log("Header 'set-cookie' lu via response.headers.get:", setCookieHeader);
                } catch (err) {
                    console.warn("Impossible de lire 'set-cookie' depuis response.headers:", err);
                }

                // Montre les cookies accessibles après la tentative (les cookies HttpOnly ne seront pas visibles ici)
                console.log("Cookies après authentification (document.cookie):", document.cookie);

                if (!authResponse.ok) {
                    const authErrorText = await authResponse.text();
                    console.error("Échec authentification:", authResponse.status, authErrorText);
                    throw new Error(`Authentification échouée: ${authResponse.status}`);
                }

                // Récupération du corps de la réponse
                const authData = await authResponse.json();
                console.log("Authentification réussie (body):", authData);

                // Configuration des headers standard pour toutes les requêtes
                const headers = {
                    "Content-Type": "application/json"
                };

                // Récupération séquentielle des données pour garantir la cohérence
                console.log("Récupération du profil... (cookies actuels):", document.cookie);
                const profil = await fetch("https://api.happyhackers.fr/profile?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include", // Important pour maintenir la session
                    mode: "cors",
                });

                console.log("Réponse profil:", profil.status, profil.statusText);
                console.log("Headers envoyés pour profil:", profil.headers);

                if (!profil.ok) {
                    console.error("Erreur récupération profil:", profil.status, profil.statusText);
                }

                console.log("Récupération des compétences... (cookies actuels):", document.cookie);
                const skills = await fetch("https://api.happyhackers.fr/skills?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                    mode: "cors",
                });

                console.log("Réponse compétences:", skills.status, skills.statusText);
                if (!skills.ok) {
                    console.error("Erreur récupération compétences:", skills.status, skills.statusText);
                }

                console.log("Récupération des expériences... (cookies actuels):", document.cookie);
                const experience = await fetch("https://api.happyhackers.fr/experience?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                    mode: "cors",
                });

                console.log("Réponse expériences:", experience.status, experience.statusText);
                if (!experience.ok) {
                    console.error("Erreur récupération expériences:", experience.status, experience.statusText);
                }

                console.log("Récupération des projets... (cookies actuels):", document.cookie);
                const projects = await fetch("https://api.happyhackers.fr/projects?id=3", {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                    mode: "cors",
                });

                console.log("Réponse projets:", projects.status, projects.statusText);
                if (!projects.ok) {
                    console.error("Erreur récupération projets:", projects.status, projects.statusText);
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
                    console.log("Récupération des données réussie");
                } catch (error) {
                    console.error("Erreur lors du parsing des données:", error);
                    setResponse([{}, {}, {}, {}]);
                }

            } catch (error) {
                console.error("Erreur lors de l'appel API:", error);
                setResponse([{}, {}, {}, {}]);
            }
        }

        callApi();
    }, []);

    return response;
}