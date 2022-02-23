import db from '../models/index.js'

const Professors = db.professors;
const Comments = db.comments;

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

function find_all(req, res) {
    Professors.findAll({
        attributes: ['id', 'name', 'email', 'image_url', 'info']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err
          });
    });
};

function rate(req, res) {
    const {id, ethic, teaching, grading, management} = req.body;
    if ([id, ethic, teaching, grading, management].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    Professors.findByPk(id)
    .then(data => {
        if (data) {
            Professors.update({
                ethic: Math.round((data.ethic * data.rate_num + ethic * 20) / (data.rate_num + 1)),
                teaching: Math.round((data.teaching * data.rate_num + teaching * 20) / (data.rate_num + 1)),
                grading: Math.round((data.grading * data.rate_num + grading * 20) / (data.rate_num + 1)),
                management: Math.round((data.management * data.rate_num + management * 20) / (data.rate_num + 1)),
                rate_num: data.rate_num + 1 
            }, {
                where: {id: data.id}
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: 'Rate changed successfully.'
                    });
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    message: "Error changing professor rate with id: " + id
                  });
            });
        } else {
            res.status(400).send({
                message: `Cannot find professor with id=${id}`
            });
        };
    })
    .catch(err => {
        res.status(500).send({
            message: `Error finding professor with id=${id}`
        });
    });
};

function find_one(req, res) {
    console.log('\n\n\n')
    const { id } = req.query;
    if ([id].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    db.sequelize.query(
        'select * from professor as p where id = ? inner join comments as c on c.professorId = p.id',
        { replacements: [id], type: db.sequelize.QueryTypes.SELECT }
    ).then(data => {
        console.log(data);
    })
};

export { create, find_all, rate, find_one };