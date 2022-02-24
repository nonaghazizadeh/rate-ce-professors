function create_request_model(sequelize, Sequelize) {
    const Request = sequelize.define('request', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
            validate: {
                notEmpty: true,
            }
        },
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        }
    }, {
        timestamps: false
    });
    return Request;
};

export default create_request_model;