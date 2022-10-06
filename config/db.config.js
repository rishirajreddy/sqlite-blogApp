module.exports = {
    HOST: "./dev.sqlite",
    USER: "root",
    PASSWORD: "fsociety",
    DB: "sqlite_nodejs",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };