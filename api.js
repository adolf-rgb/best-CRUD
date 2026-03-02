const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Company = require('../models/Company');
const { Op } = require('sequelize');

router.get('/products.json', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;

  let where = { is_hidden: false };

  if (req.query.query) {
    where[Op.or] = [
      { name_en: { [Op.like]: `%${req.query.query}%` } },
      { name_fr: { [Op.like]: `%${req.query.query}%` } },
      { description_en: { [Op.like]: `%${req.query.query}%` } },
      { description_fr: { [Op.like]: `%${req.query.query}%` } }
    ];
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    include: Company,
    limit: perPage,
    offset
  });

  res.json({
    data: rows,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(count / perPage),
      per_page: perPage
    }
  });
});

// SINGLE PRODUCT JSON
router.get('/products/:gtin.json', async (req, res) => {
  const product = await Product.findOne({
    where: { gtin: req.params.gtin, is_hidden: false },
    include: Company
  });

  if (!product) return res.status(404).json({ error: "Not Found" });
  res.json(product);
});

module.exports = router;
