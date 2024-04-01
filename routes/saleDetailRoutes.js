const express = require('express');
const SaleDetailController = require('../controllers/saleDetailController');
const router = express.Router();

router.get('/', SaleDetailController.getAllSaleDetails);
router.post('/', SaleDetailController.createSaleDetail);
router.put('/:id', SaleDetailController.updateSaleDetail);
router.delete('/:id', SaleDetailController.deleteSaleDetail);


module.exports = router;
