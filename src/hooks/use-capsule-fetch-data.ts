/**
 * External dependencies.
 */
import {useEffect, useState} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies.
 */
import {ICapsule} from "../interfaces";

export default function useCapsuleFetchData(path: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [capsules, setCapsules] = useState<Array<ICapsule>>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        apiFetch({path, parse: false}).then(
            (response: { headers: object; json: any }) =>
                Promise.all([response.headers, response.json()]).then(
                    ([headers, data]) => ({headers, data})
                )
        ).then((response) => {
            setCapsules(response.data ?? []);
            setTotal((response.headers && response.headers.get('X-WP-Total')) ?? 0);
            setLoading(false);
        })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [path]);

    return {
        loading,
        capsules,
        total
    }
}
