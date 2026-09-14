import { useEffect, useState } from "react"
import type { Quote } from "../models/quote"

const useQuote = () => {
    const [quote, setQuote] = useState<Quote | null>();
    const [error, setError] = useState<string>();
    
    useEffect(() => {
        (async() => {
            try {
                const response = await fetch("https://quotes.liupurnomo.com/api/quotes/random");
                const result = await response.json() as Quote;
                setQuote(result);
            } catch (error) {
                const err = error instanceof Error ? error.message : String(error);
                setError(err);
            }
        })();
    }, []);
    
    return {quote, error};
}

export default useQuote;