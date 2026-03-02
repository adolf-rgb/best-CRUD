const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Company = require('../models/Company');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GTIN VALIDATION (13 or 14 digits)
function validateGTIN(gtin) {
  return /^[0-9]{13,14}$/.test(gtin);
}

// LIST PRODUCTS
router.get('/', auth, async (req, res) => {
  const products = await Product.findAll({ include: Company });
  res.json(products);
});

// CREATE PRODUCT
router.post('/new', auth, upload.single('image'), async (req, res) => {

  if (!validateGTIN(req.body.gtin)) {
    return res.status(400).send("GTIN must be 13 or 14 digits");
  }

  const exist = await Product.findOne({ where: { gtin: req.body.gtin } });
  if (exist) {
    return res.status(400).send("GTIN must be unique");
  }

  await Product.create({
    companyId: req.body.companyId,
    name_en: req.body.name_en,
    name_fr: req.body.name_fr,
    description_en: req.body.description_en,
    description_fr: req.body.description_fr,
    gtin: req.body.gtin,
    brand: req.body.brand,
    country_of_origin: req.body.country,
    gross_weight: req.body.gross,
    net_weight: req.body.net,
    weight_unit: req.body.unit,
    image_path: req.file ? req.file.filename : null
  });

  res.send("Product Created Successfully");
});

// HIDE PRODUCT
router.post('/:gtin/hide', auth, async (req, res) => {
  await Product.update({ is_hidden: true }, {
    where: { gtin: req.params.gtin }
  });
  res.send("Product Hidden");
});

// DELETE (ONLY HIDDEN PRODUCTS)
router.delete('/:gtin', auth, async (req, res) => {
  const product = await Product.findOne({
    where: { gtin: req.params.gtin, is_hidden: true }
  });

  if (!product) {
    return res.status(400).send("Only hidden products can be deleted");
  }

  await product.destroy();
  res.send("Product Permanently Deleted");
});

module.exports = router;
