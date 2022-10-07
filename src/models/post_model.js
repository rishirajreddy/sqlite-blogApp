const {format} = require("date-fns");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        title: {
            type:Sequelize.STRING,
            allowNull: false
        },
        body: {
            type:Sequelize.STRING,
            allowNull: false
        },
        category: {
            type:Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type:Sequelize.INTEGER,
        },
        createdAt: {
            type:Sequelize.STRING
        },
        updatedAt: {
            type:Sequelize.STRING,
            allowNull: true,
            default: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
    });

    return Post;
};

