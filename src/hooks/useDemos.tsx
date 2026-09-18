import { useEffect, useState } from "react"
import type { Demo } from "../models/demo"

const useDemo = () => {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDemo();
    }, []);

    const fetchDemo = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/v1/demos`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as Demo[];
            setDemos(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            setDemos([]);
        } finally {
            setLoading(false);
        }
    }

    return { demos, loading, error, refetch: fetchDemo };
}

export default useDemo;