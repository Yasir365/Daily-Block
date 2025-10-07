import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((json) => setData(json))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading };
};
