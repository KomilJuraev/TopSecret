const bcrypt = require('bcrypt');
const validator = require('validator'); 
const db = require('../utils/db');
const { createToken } = require('../utils/token');


const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkEmail = await db.query("Select * from users where email = $1", [email]);

        if(checkEmail.rows.length > 0) {
            return res.status(400).json({error: "email is already registered, please try another email to register."});
        } 

        if(!validator.isEmail(email)) {
            return res.status(400).json({error: "invalid email, please enter correct email."});
        } 

        if(!validator.isStrongPassword(password)) {
            return res.status(400).json({error: "password is too weak, please enter strong password."});
        }  

        const hashedPass = await bcrypt.hash(password, 10);
        await db.query("insert into users (email, password) VALUES ($1, $2)", [email, hashedPass]);
        const addedEmailInfo = await db.query("Select * from users where email = $1", [email]);
        const token = createToken(addedEmailInfo.rows[0].id);

        return res.status(200).json({addedEmailInfo, token});
    } catch(err) {
        return res.status(400).json({error: err + "An error occurred during registration. Please try again."});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkEmail = await db.query("Select * from users where email = $1", [email]);

        if(checkEmail.rows.length > 0) {
            const dbPassword = checkEmail.rows[0].password;
            const matchPass = await bcrypt.compare(password, dbPassword);
        
            if(matchPass) {
                const token = createToken(checkEmail.rows[0].id);
                return res.status(200).json({checkEmail, token});
            } else {
                return res.status(400).json({error: "Invalid password"});
            }
        } else {
            return res.status(400).json({error: "Email does not exist, please enter valid email"});
        }
    } catch(err) {
        return res.status(400).json({error: err});
    }
}

module.exports = { register, login };