const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('Company', {
  company_name: DataTypes.STRING,
  company_address: DataTypes.TEXT,
  company_telephone: DataTypes.STRING,
  company_email: DataTypes.STRING,
  owner_name: DataTypes.STRING,
  owner_mobile: DataTypes.STRING,
  owner_email: DataTypes.STRING,
  contact_name: DataTypes.STRING,
  contact_mobile: DataTypes.STRING,
  contact_email: DataTypes.STRING,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Company;
