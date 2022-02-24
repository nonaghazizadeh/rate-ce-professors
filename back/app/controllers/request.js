import db from '../models/index.js'

const Requests = db.requests;
const Professors = db.professors;

async function create(req, res) {
    const {name} = req.body;
    if ([name].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };
    
    const prof = await Professors.findOne({
        where: {name: name}
    });
    if (prof != null) {
        res.status(400).send({
            message: "professor already exists."
        })
        return;
    };

    const prof_req = await Requests.findOne({
        where: {name: name}
    });
    if (prof_req != null) {
        prof_req.count = prof_req.count + 1;
        prof_req.save();

        res.send(prof_req);
    } else {
        Requests.create({
            name: name
        }).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Error while creating request!'
            });
        });
    };
};

function get_all(req, res) {
    Requests.findAll({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
          });
    });
};

export { create, get_all };