import "../styles/stylesheet.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser  } from "../context/UserContext";
import { registerUser, loginUser } from "../services/api";

const InputForm = (props) => {
    const { setUserId, setToken } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if(email !== '' && password !== "") {
            if(props.page === "Register") {
                register();
            } else {
                login()
            }
        }
    }   

    async function register() {
        try {
            const data = await registerUser(email, password);
            if(!data.error) {
                setUserId(data.addedEmailInfo.rows[0].id);
                setToken(data.token);
                saveDataToLocalStorage(data.addedEmailInfo.rows[0].id, data.token)
                navigate('/secrets');
            } else {
                setError(data.error)
            }    
        } catch(error) {
            setError('An error occurred. Please try again later.');
        }
    }

    async function login() {
        try {
            const data = await loginUser(email, password);
            if(!data.error) {
                setUserId(data.checkEmail.rows[0].id);
                setToken(data.token);
                saveDataToLocalStorage(data.checkEmail.rows[0].id, data.token);
                navigate('/secrets');
            } else {
                setError(data.error)
            }
        } catch(error) {
            setError('An error occurred. Please try again later.');
        }
    }

    function saveDataToLocalStorage(userID, userToken) {
        localStorage.setItem('userId', userID);
        localStorage.setItem('token', userToken);    
    }

    return (
        <div>
            <div className="error-msg-div">
                <p className="error-msg">{error}</p>
            </div>
            <form className="input-form" onSubmit={handleSubmit} >
                <div className="email-div form-divs">
                    <label>Email: </label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} required/>
                </div>
                <div className="password-div form-divs">
                    <label>Password: </label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} required/>
                </div>
                <div className="submit-div">
                    <button className="submit-btn" type="submit" >{props.page}</button>
                </div>
            </form>
        </div>
    )
}

export default InputForm;