const HttpError = require("../models/http-error");
const Product = require("../models/product");
let formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const app = require("../app");

const addProduct = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    const { title, description, price, currency, category, stock} =
      fields;
    const existProduct = await Product.findOne({
      title,description,price,currency,category,stock
    });
    if (existProduct) {
      return(
        res.status(401).json({
          message: "Exist Product!",
        })
      ) 
    } else {
      const image = files.image;
      let oldPath = image.filepath;
      let imageName =
        uuidv4() +
        image.originalFilename.substring(
          image.originalFilename.indexOf(".") - 1
        );
      const domain = req.protocol + "://" + req.get("host");
      const imageUrl = `${domain}/images/${imageName}`;

      const product = new Product({
        title,
        description,
        price,
        currency,
        category,
        image: imageUrl,
        stock,
      });

      try {
        var newPath = path.join(app.imagesFolder, imageName);
        await product.save();
        var rawData = fs.readFileSync(oldPath);
        fs.writeFile(newPath, rawData, (err) => {
          if (err) {
            res.status(403).json({
              message: "failed to upload image but product added successfully",
            });
          } else {
            res.status(201).json({
              message: "product added successfully",
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    const error = new HttpError("Could not add product", 500);
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  let filePath = app.imagesFolder;
  const { id } = req.body;
  try {
    const product = await Product.findById(id);
    const imageName = product.image.substring(29);
    try {
      var currentPath = path.join(filePath, imageName);
    } catch (err) {
      console.log(err);
    }

    try {
      fs.unlink(currentPath, async () => {
        await product.remove();
        res.status(201).json({
          message: "product deleted successfully",
        });
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    const error = new HttpError("Could not deleted product", 500);
    return next(error);
  }
};

const editProduct = async (req, res, next) => {
  let filePath = app.imagesFolder;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    const { id, title, description, price, currency, category, stock, image } =
      fields;
    const existProduct = await Product.findById(id);
    if (existProduct) {
      existProduct.title = title;
      existProduct.description = description;
      existProduct.price = price;
      existProduct.currency = currency;
      existProduct.category = category;
      existProduct.stock = stock;
      if (files.image) {
        const imgName = existProduct.image.substring(29);
        try {
          var currentPath = path.join(filePath, imgName);
        } catch (err) {
          const error = new HttpError("Could not deleted image", 500);
          return next(error);
        }

        try {
          fs.unlink(currentPath, () => {});
        } catch (err) {
          const error = new HttpError("Could not deleted image", 500);
          return next(error);
        }
        const image = files.image;
        let oldPath = image.filepath;
        let imageName =
          uuidv4() +
          image.originalFilename.substring(
            image.originalFilename.indexOf(".") - 1
          );
        const domain = req.protocol + "://" + req.get("host");
        const imageUrl = `${domain}/images/${imageName}`;

        existProduct.image = imageUrl;
        try {
          var newPath = path.join(app.imagesFolder, imageName);
          await existProduct.save();
          var rawData = fs.readFileSync(oldPath);
          fs.writeFile(newPath, rawData, (err) => {
            if (err) {
              const error = new HttpError("Could not deleted image", 500);
              return next(error);
            } else {
              res.status(200).json({
                message: "product updated successfully",
              });
            }
          });
        } catch (err) {
          console.log(err)
        }
      }
      else
      {
     await existProduct.save();
      res.status(200).json({
        message: "product updated successfully",
      });
      }
 
    }
  });
};

exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.getProducts = getProducts;
exports.addProduct = addProduct;
