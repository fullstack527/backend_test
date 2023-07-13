const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;

module.exports=(database, Sequelize)=>{

    return database.define("product", {
        nama: DataTypes.STRING,
        harga_jual: DataTypes.STRING,
        harga_beli: DataTypes.STRING,
        type_produk: DataTypes.STRING,
        tanggal_rilis: DataTypes.STRING,
    })
}