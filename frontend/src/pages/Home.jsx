import "../styles/stylesheet.css";

const Home = () => {
    return (
        <div className="home-div">
            <h2 className="home-title">Register or Login to Keep your secrets with us.</h2>
            <div className="button-div">
                <a className="button register-btn" href="/register">Register</a>
                <a className="button login-btn" href="/login">Login</a>
            </div>
        </div>     
    )
}

export default Home;