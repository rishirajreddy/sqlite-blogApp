module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    args:true,
                    msg:"Email id is required"
                },
                isEmail : {
                    args:true,
                    msg:"Valid email-id required"
                }
            },
            unique: {msg:"Email id must be unique"},
            allowNull: false
        },
        username: {
            type:Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User;
};

