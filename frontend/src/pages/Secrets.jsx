import "../styles/stylesheet.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { checkTokenExpiration } from "../utils/tokenUtils";
import { getSecretsForUser, addSecretForUser } from "../services/api";
import Spinner from "../components/Spinner";

const Secrets = () => {
    const { userId, setUserId, token, setToken } = useUser();
    const [secret, setSecret] = useState('');
    const [listOfSecrets, setListOfSecrets] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
        if(storedUserId && storedToken) {
            setUserId(storedUserId);
            setToken(storedToken);

            if(checkTokenExpiration()) {
                logOutUser();
            } 
        } else {
            navigate('/')
        }

        const interval = setInterval(() => {
            if (checkTokenExpiration()) {
                logOutUser();
            }
        }, 60000);
        return () => clearInterval(interval);

    }, [setUserId, setToken, navigate]);

    useEffect(() => {
        const fetchSecrets = async () => {
            try {
                if(userId && token) {
                    const data = await getSecretsForUser(userId);
                    const secrets = data.result.rows.map(row => row.secret_info);
                    setLoading(false);
                    setListOfSecrets(secrets)
                } 
            } catch(error) {
                setLoading(false);
                console.log(error);
            }
        }
        fetchSecrets();
    }, [secret, userId]);

    function logOutUser() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setUserId('');
        setToken('');
        setLoading(true);  
        navigate('/');
    }

    async function addSecret(event) {
        event.preventDefault();
        if(!secret || secret.trim() === '') {
            setError('Invalid input Secret cannot be empty or just spaces.')
        } else {
            setError('');
        }
        
        try {
            const data = await addSecretForUser(userId, secret);
            console.log(data);
            setListOfSecrets([...listOfSecrets, secret]);
        } catch(error) {
            setError(error);
            console.log(error);
        }
        setSecret('');
    }

    return (
        <div className="scrt-div">
            <div className="scrt-hdr-cont">
                <h2 className="scrt-hdr">Add your secret here and keep it secure.</h2>
            </div>
            <div className="scrt-lst">
                {
                    loading ?  ( <Spinner /> ) :
                    <ul>
                        {
                            listOfSecrets.map((eachSecret, index) => {
                                return <li key={index} className="lst-scrt">{eachSecret}</li>
                            })
                        }
                    </ul>
                }
            </div>
            <div className="scrt-inpt-divs">
                <input className="scrt-inpt" type="text" placeholder="Type a secret" value={secret} onChange={(e) => setSecret(e.target.value) } required/>
                <button className="scrt-add" onClick={addSecret}>+</button>
            </div>
            <div><p className="error-msg">{error}</p></div>
            <div className="logout-div">
                <button className="logout-btn" onClick={logOutUser}>Log Out</button>
            </div>
        </div>
    )
}

export default Secrets;