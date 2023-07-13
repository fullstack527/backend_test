module.exports ={
    USER : "root",
    DB: "test_fullstack",
    PASSWORD : "",
    HOST: "localhost",
    dialect: "mysql",
    pool:{
      max: 15,
      min: 5,
      idle: 20000,
      acquire: 30000
    }
}
