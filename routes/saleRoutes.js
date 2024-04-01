const express = require('express');
const SaleController = require('../controllers/saleController');
const router = express.Router();

router.post('/finalizeSale', SaleController.finalizeSale);

module.exports = router;
