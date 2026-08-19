import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioAbout from "../components/portfolio/PortfolioAbout";
import PortfolioSkills from "../components/portfolio/PortfolioSkills";
import PortfolioProjects from "../components/portfolio/PortfolioProjects";
import PortfolioExperience from "../components/portfolio/PortfolioExperience";
import PortfolioContact from "../components/portfolio/PortfolioContact";
import PortfolioFooter from "../components/portfolio/PortfolioFooter";

function PublicPortfolio() {
    const { username } = useParams();

    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPortfolio() {
            try {
                setLoading(true);
                setError("");
                setPortfolio(null);

                const response = await api.get(
                    `/users/portfolio/${username}`
                );

                console.log(
                    "PUBLIC PORTFOLIO:",
                    response.data
                );

                setPortfolio(response.data);

            } catch (error) {
                console.error(
                    "Public portfolio error:",
                    error
                );

                setError(
                    error.response?.data?.error ||
                    "Portfolio not found"
                );

            } finally {
                setLoading(false);
            }
        }

        if (!username) {
            setLoading(false);
            setError("Portfolio username is missing.");
            return;
        }

        loadPortfolio();

    }, [username]);


    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-sm text-gray-500">
                    Loading portfolio...
                </p>
            </main>
        );
    }


    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">

                    <h1 className="text-xl font-semibold text-gray-900">
                        Portfolio not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                </div>

            </main>
        );
    }


    if (!portfolio?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">

                    <h1 className="text-xl font-semibold text-gray-900">
                        Portfolio not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        This portfolio is not available.
                    </p>

                </div>

            </main>
        );
    }


    const {
        user,
        projects = [],
        skills = [],
        experiences = []
    } = portfolio;


    return (
        <main className="min-h-screen bg-white">

            <PortfolioHero
                user={user}
            />

            <PortfolioAbout
                user={user}
            />

            <PortfolioSkills
                skills={skills}
            />

            <PortfolioProjects
                projects={projects}
            />

            <PortfolioExperience
                experiences={experiences}
            />

            <PortfolioContact
                user={user}
            />

            <PortfolioFooter
                user={user}
            />

        </main>
    );
}

export default PublicPortfolio;