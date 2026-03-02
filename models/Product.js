const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Company = require('./Company');

const Product = sequelize.define('Product', {
  name_en: DataTypes.STRING,
  name_fr: DataTypes.STRING,
  description_en: DataTypes.TEXT,
  description_fr: DataTypes.TEXT,
  gtin: { type: DataTypes.STRING, unique: true },
  brand: DataTypes.STRING,
  country_of_origin: DataTypes.STRING,
  gross_weight: DataTypes.FLOAT,
  net_weight: DataTypes.FLOAT,
  weight_unit: DataTypes.STRING,
  image_path: DataTypes.STRING,
  is_hidden: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Company.hasMany(Product, { foreignKey: 'companyId' });
Product.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Product;
