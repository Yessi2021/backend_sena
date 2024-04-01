const Product = require('../models/productModel');
const { checkIfRecordExists } = require('../helpers/validateId');

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const [products] = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send('Error al obtener los productos');
        }
    }

    static async getProduct(req, res) {
        try {
            const { id } = req.params;
            const [product] = await Product.findById(id);
            if (product.length === 0) {
                return res.status(404).send('Producto no encontrado');
            }
            res.status(200).json(product[0]);
        } catch (error) {
            res.status(500).send('Error al obtener el producto');
        }
    }

    static async createProduct(req, res) {
        try {
            const { name, description, price, stock, categoryId } = req.body;
                  // Verificar si la categoría existe
            const categoryExists = await checkIfRecordExists('Categorias', categoryId);
            if (!categoryExists) {
                return res.status(404).send('Categoría no encontrada');
            }

            const product = new Product(name, description, price, stock, categoryId);
            await product.save();
            res.status(201).send('Producto creado con éxito');
        } catch (error) {
            res.status(500).send('Error al crear el producto');
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, stock, categoryId } = req.body;

            

            const exists = await checkIfRecordExists('Productos', id);
            if (!exists) {
                return res.status(404).send('Producto no encontrado');
            }

            await Product.update(id, name, description, price, stock, categoryId);
            res.status(200).send('Producto actualizado con éxito');
        } catch (error) {
            res.status(500).send('Error al actualizar el producto');
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const exists = await checkIfRecordExists('Productos', id);
            if (!exists) {
                return res.status(404).send('Producto no encontrado');
            }

            await Product.delete(id);
            res.status(200).send('Producto eliminado con éxito');
        } catch (error) {
            res.status(500).send('Error al eliminar el producto');
        }
    }
}

module.exports = ProductController;
