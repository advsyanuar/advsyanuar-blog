import { useEffect, useState } from "react"
import type { Project } from "../models/project"

const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await fetch(import.meta.env.VITE_ENDPOINT + "/api/v1/projects/");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json() as Project[];
                setProjects(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoading(false);
            }
        })()
    }, []);

    return { projects, loading, error };
}

export default useProjects;