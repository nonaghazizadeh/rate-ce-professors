import db from '../models/index.js'

const Professors = db.professors;

function create(req, res) {
    const {name, email, image_url, info} = req.body;
    if ([name, email, image_url, info].includes(undefined)) {
        res.status(400).send({
            message: "provide all name, email, image_url and info."
        });
        return;
    };
    
    Professors.create({
        name: name,
        email: email,
        image_url: image_url,
        info: info
    }).then(data => {
        res.send({
            id: data.id,
            name: data.name,
            image_url: data.image_url,
            info: data.info
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error while creating professor!'
        });
    });
};

export { create };