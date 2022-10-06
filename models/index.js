const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, 
    dbConfig.PASSWORD
    , {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        define: {
            timestamps:false
        },
        pool: {
            max:5,
            min: 0,
            acquire: 30000,
            idle: 10000 
        }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize  = sequelize;

db.users = require("./user_model")(sequelize, Sequelize);
db.posts = require("./post_model")(sequelize, Sequelize);

db.users.hasMany(db.posts, {
    foreignKey: 'userId'
});
db.posts.belongsTo(db.users, {
    foreignKey: 'userId',
});

module.exports = db;