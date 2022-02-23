function create_professor_model(sequelize, Sequelize) {
    const Professor = sequelize.define('professor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            isEmail: true
        },
        image_url: {
            type: Sequelize.STRING,
            isUrl: true,
            unique: true
        },
        info: Sequelize.TEXT
    }, {
        timestamps: false
    });
    return Professor;
};

export default create_professor_model;