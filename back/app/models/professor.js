function create_professor_model(sequelize, Sequelize) {
    const Professor = sequelize.define('professor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                allowNull: true,
                notEmpty: true,
            }
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        image_url: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isUrl: true,
            }
        },
        info: Sequelize.TEXT,
        ethic: {
            type: Sequelize.INTEGER,
            defaultValue: 50,
            validate: {
                min: 0,
                max: 100
            }
        },
        teaching: {
            type: Sequelize.INTEGER,
            defaultValue: 50,
            validate: {
                min: 0,
                max: 100
            }
        },
        grading: {
            type: Sequelize.INTEGER,
            defaultValue: 50,
            validate: {
                min: 0,
                max: 100
            }
        },
        managemet: {
            type: Sequelize.INTEGER,
            defaultValue: 50,
            validate: {
                min: 0,
                max: 100
            }
        }
    }, {
        timestamps: false
    });
    return Professor;
};

export default create_professor_model;