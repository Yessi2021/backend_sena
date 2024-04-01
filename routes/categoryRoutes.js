const express = require('express');
const CategoryController = require('../controllers/categoryController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

// Todas las rutas aquí estarán protegidas por el middleware de autenticación
router.use(authenticate);

router.get('/', CategoryController.getAllCategories);
// Usa el middleware de autorización solo en la ruta de creación, pasando los roles permitidos como argumento
router.post('/', authorize(['admin']), CategoryController.createCategory);

router.get('/:id', authorize(['admin']), CategoryController.getOneCategory);
router.put('/:id', authorize(['admin']), CategoryController.updateCategory);
router.delete('/:id', authorize(['admin']), CategoryController.deleteCategory);

module.exports = router;
