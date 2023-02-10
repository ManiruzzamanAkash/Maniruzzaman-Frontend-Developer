/**
 * Internal dependencies.
 */
import { IBadge } from "../../interfaces";

export default function Badge({ status }: IBadge) {
    const bgColors = {
        'active': '#2ea043',
        'retired': 'red',
        'unknown': '#ccc',
    };

    return (
        <span style={{ 
            background: bgColors?.[status],
            color: '#fff',
            padding: '2px 6px',
            textTransform: 'capitalize',
            opacity: 0.8
         }}>{status}</span>
    )
}