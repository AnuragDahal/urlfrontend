import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Redirect: React.FC = () => {
    const { uniqueString } = useParams<{ uniqueString: string }>();

    useEffect(() => {
        if (uniqueString) {
            // Forward the request to the backend
            window.location.href = `https://snip-nsca.onrender.com/${uniqueString}`;
        }
    }, [uniqueString]);

    return <div>Redirecting...</div>;
};

export default Redirect;

