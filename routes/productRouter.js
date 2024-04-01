const express = require('express');
const ProductController = require('../controllers/productController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', authenticate, authorize(['admin']), ProductController.createProduct);
router.put('/:id', authenticate, authorize(['admin']), ProductController.updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), ProductController.deleteProduct);

module.exports = router;
