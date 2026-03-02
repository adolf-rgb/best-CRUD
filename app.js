const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./config/database');

const adminRoutes = require('./routes/admin');
const companyRoutes = require('./routes/companies');
const productRoutes = require('./routes/products');
const apiRoutes = require('./routes/api');
const publicRoutes = require('./routes/public');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'ws_secret',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ROUTES (MATCH PDF PATHS)
app.use('/XX_module_b', adminRoutes);
app.use('/XX_module_b/companies', companyRoutes);
app.use('/XX_module_b/products', productRoutes);
app.use('/XX_module_b', apiRoutes);
app.use('/XX_module_b', publicRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Running: http://localhost:3000/XX_module_b/login');
  });
});
