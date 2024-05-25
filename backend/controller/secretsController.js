const db = require('../utils/db');


const getSecretForUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await db.query("Select * from secrets where user_id = ($1)", [userId]);
        if(result.rows.length > 0) {
            return res.status(200).json({result});
        } else {
            return res.status(200).json("Currently there is no secrets, please add some secrets");
        }
    } catch(err) {
        return res.status(400).json({error: err});
    }

}

const insertSecret = async (req, res) => {
    const { userId, secretInfo } = req.body;

    if (!userId && !secretInfo && typeof secretInfo !== 'string' ) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    try {
        const result = await db.query("insert into secrets (user_id, secret_info) VALUES ($1, $2)", [userId, secretInfo]);

        return res.status(200).json({result});
    } catch(err) {
        return res.status(400).json({error: err});
    }
}

module.exports = { getSecretForUser, insertSecret };