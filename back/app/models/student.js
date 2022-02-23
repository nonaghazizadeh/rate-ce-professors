function create_student_model(sequelize, Sequelize) {
    const Student = sequelize.define('student', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
        },
        lastname: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
        },
        student_number: {
            type: Sequelize.STRING,
            notNull: true
        },
        code_meli: {
            type: Sequelize.STRING,
            notNull: true
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "pending",
            isIn: [['pending', 'accept', 'reject']] 
        }
    }, {
        timestamps: false
    });
    return Student;
};

export default create_student_model;