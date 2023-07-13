const Sequelize = require("sequelize");
const { Op } = Sequelize;
const path = require("path");
const fs = require("fs");
const db = require("../model");
const Product = db.product;

exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 4;
  const search = req.query.search_query || "";

  const offset = limit * page;
  const totalRows = await Product.count({
    where: {
      [Op.or]: [
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });

  const totalPage = Math.ceil(totalRows / limit);
  const result = await Product.findAll({
    where: {
      [Op.or]: [
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

exports.getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.saveProduct = async (req, res) => {
  const nama = req.body.nama;
  const harga_beli = req.body.harga_beli;
  const resHarga_beli = harga_beli.replace(/\D/g, "");
  const harga_jual = req.body.harga_jual;
  const resHarga_jual = harga_jual.replace(/\D/g, "");
  const type_produk = req.body.type_produk;
  const tanggal_rilis = req.body.tanggal_rilis;
  var date = new Date(tanggal_rilis),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  const dataDate = [date.getFullYear(), mnth, day].join("-");

  try {
    await Product.create({
      nama: nama,
      harga_beli: resHarga_beli,
      harga_jual: resHarga_jual,
      type_produk: type_produk,
      tanggal_rilis: dataDate,
    });

    res.status(201).json({ msg: "Product Created Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const nama = req.body.nama;
  const harga_beli = req.body.harga_beli;
  const resHarga_beli = harga_beli.replace(/\D/g, "");
  const harga_jual = req.body.harga_jual;
  const resHarga_jual = harga_jual.replace(/\D/g, "");
  const type_produk = req.body.type_produk;
  const tanggal_rilis = req.body.tanggal_rilis;
  var date = new Date(tanggal_rilis),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  const dataDate = [date.getFullYear(), mnth, day].join("-");

  try {
    await Product.update(
      {
        nama: nama,
        harga_beli: resHarga_beli,
        harga_jual: resHarga_jual,
        type_produk: type_produk,
        tanggal_rilis: dataDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
