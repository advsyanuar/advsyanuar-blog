import { useEffect, useState } from "react";
import type { SiteSetting } from "../models/site-setting";

const useSiteSettings = () => {
    const [siteSettings, setSiteSettings] = useState<SiteSetting | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSiteSettings();
    }, []);

    const fetchSiteSettings = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/v1/site-settings`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as SiteSetting;
            setSiteSettings(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            setSiteSettings(null);
        } finally {
            setLoading(false);
        }
    }

    return { siteSettings, loading, error, refetch: fetchSiteSettings };
}

export default useSiteSettings