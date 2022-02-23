function create_admin_model(sequelize, Sequelize) {
    const Admin = sequelize.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            validate: {
                allowNull: true,
                notEmpty: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                allowNull: true,
                notEmpty: true,
            }
        }
    }, {
        timestamps: false
    });
    return Admin;
};

export default create_admin_model;