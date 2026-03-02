const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  if (req.body.passphrase === 'admin') {
    req.session.admin = true;
    return res.redirect('/XX_module_b/products');
  }
  res.status(401).send("Unauthorized");
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/XX_module_b/login');
});

module.exports = router;
