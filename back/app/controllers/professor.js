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

async function find_one(req, res) {
    console.log('\n\n\n')
    const { prof_id, stu_id } = req.query;
    if ([prof_id, stu_id].includes(undefined)) {
        res.status(400).send({
            message: "provide all parameters."
        });
        return;
    };

    const prof_data = await Professors.findOne({
        where: {id: prof_id}
    })

    const editable_comments = await db.sequelize.query(
        'select c.id, concat_ws(\' \', s.firstname, s.lastname) AS author, c.content, c.show_name from comments c inner join students s on c.stu_id = s.id where s.id=?',
        { replacements: [stu_id], type: db.sequelize.QueryTypes.SELECT }
    )

    const non_editable_comments = await db.sequelize.query(
        'select c.id, concat_ws(\' \', s.firstname, s.lastname) AS author, c.content, c.show_name from comments c inner join students s on c.stu_id = s.id where s.id!=?',
        { replacements: [stu_id], type: db.sequelize.QueryTypes.SELECT }
    )

    res.send({
        name: prof_data.name,
        image_url: prof_data.image_url,
        email: prof_data.email,
        info: prof_data.info,
        ethic_avg: prof_data.ethic,
        teaching_avg: prof_data.teaching,
        grading_avg: prof_data.grading,
        management_avg: prof_data.management,
        editable_comments: editable_comments,
        non_editable_comments: non_editable_comments
    });
};

export { create, find_all, rate, find_one };