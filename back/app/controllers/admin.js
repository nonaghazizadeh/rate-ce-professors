import db from '../models/index.js'


const Admins = db.admins;

async function login(req, res) {
    const {username, password} = req.query;
    if ([username, password].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };
    
    const admin = await Admins.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if (admin) {
        res.send(admin);
    } else {
        res.status(400).send({
            message: "Admin does not exist"
        });
    }
};

export { login };