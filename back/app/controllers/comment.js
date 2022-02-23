import db from '../models/index.js'

const Commets = db.comments;

function create(req, res) {
    const {prof_id, stu_id, content, show_name} = req.body;
    if ([prof_id, stu_id, content, show_name].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };
    
    Commets.create({
        professorId: prof_id,
        studentId: stu_id,
        content: content,
        show_name: show_name
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error while creating professor!'
        });
    });
};

function update(req, res) {
    
};

export { create };