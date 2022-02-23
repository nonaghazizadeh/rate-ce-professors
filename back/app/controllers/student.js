import db from '../models/index.js'

const Students = db.students;

function create(req, res) {
    const {firstname, lastname, student_number, code_meli} = req.body;
    if ([firstname, lastname, student_number, code_meli].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };
    
    Students.create({
        firstname: firstname,
        lastname: lastname,
        student_number: student_number,
        code_meli: code_meli
    }).then(data => {
        res.send({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            student_number: data.student_number,
            code_meli: data.code_meli,
            status: data.status
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error while creating student!'
        });
    });
};

function get_pendings(req, res) {
    Students.findAll({
        attributes: ['id', 'firstname', 'lastname', 'student_number', 'code_meli'],
        where: {status: "pending"}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err
          });
    });
}

function change_status(req, res) {
    const { id, accept } = req.body;
    if ([id, accept].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    let status = "reject";
    if (accept) {
        status = "accept"
    }

    Students.update({
        status: status
    }, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: 'Status changed successfully.'
            });
        };
    })
    .catch(err => {
        res.status(500).send({
            message: "Error changing user status with id: " + id
          });
    });
};

async function login(req, res) {
    const { student_number, code_meli } = req.body;
    if ([student_number, code_meli].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    const stu = await Students.findOne({
        where: {
            student_number: student_number,
            code_meli: code_meli
        }
    });
    if (!stu) {
        res.send({
            id: stu.id
        });
    } else {
        res.status(400).send({
            message: "User does not exist"
        });
    };
};

export { create, get_pendings, change_status, login };