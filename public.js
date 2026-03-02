const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Company = require('../models/Company');

// BULK GTIN VERIFY PAGE
router.post('/verify', async (req, res) => {
  const gtins = req.body.gtins.split('\n');
  let results = [];
  let allValid = true;

  for (let g of gtins) {
    const product = await Product.findOne({
      where: { gtin: g.trim(), is_hidden: false }
    });

    const valid = !!product;
    if (!valid) allValid = false;

    results.push({ gtin: g.trim(), valid });
  }

  res.json({ allValid, results });
});

// PUBLIC PRODUCT PAGE (/01/GTIN)
router.get('/01/:gtin', async (req, res) => {
  const product = await Product.findOne({
    where: { gtin: req.params.gtin, is_hidden: false },
    include: Company
  });

  if (!product) return res.status(404).send("Product Not Found");

  res.json({
    company: product.Company.company_name,
    name: product.name_en,
    gtin: product.gtin,
    description: product.description_en,
    weight: product.gross_weight + " " + product.weight_unit
  });
});

module.exports = router;
