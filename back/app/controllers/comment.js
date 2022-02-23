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
    const { id, content } = req.body;
    if ([id, content].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    Commets.update({
        content: content
    }, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: 'Comment changed successfully.'
            });
        };
    })
    .catch(err => {
        res.status(500).send({
            message: "Error changing comment with id: " + id
          });
    });
};

function delete_one(req, res) {
    const { id } = req.query;
    if ([id].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    Commets.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Successfully deleted comment with id: " + id
            });
        };
    }).catch(err => {
        res.status(500).send({
            message: "Error deleting comment with id: " + id
          });
    });
}

export { create, update, delete_one };