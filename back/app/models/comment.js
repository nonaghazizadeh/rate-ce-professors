function create_comment_model(sequelize, Sequelize) {
    const Comment = sequelize.define('comment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: Sequelize.TEXT,
            notNull: true,
            validate: {
                notEmpty: true,
            }
        },
        show_name: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    }, {
        timestamps: false
    });
    return Comment;
};

export default create_comment_model;