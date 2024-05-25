import "../styles/stylesheet.css";
import InputForm from "../components/InputForm";

const Login = () => {
    return (
        <div className="login-div">
            <h2 className="login-title">Login</h2>
            <InputForm page="Login"/>
        </div>
    )
}

export default Login;