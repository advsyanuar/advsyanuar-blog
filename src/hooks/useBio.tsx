import { useEffect, useState } from "react";
import type { Biography } from "../models/biography";

const ENDPOINT = "http://localhost:8085/api/v1/biography/";

const useBio = () => {
    const [data, setData] = useState<Biography | null>();
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        (async() => {
            try {
                const response = await fetch(ENDPOINT);
                const result = await response.json();
                setData(result);
            } catch (error) {
                const err = error instanceof Error ? error.message : String(error);
                setError(err);
            }
        })();

    }, []);

    return {
        data, error
    }
}

export default useBio;