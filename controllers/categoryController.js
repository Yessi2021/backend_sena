const { checkIfRecordExists } = require('../helpers/validateId');
const Category = require('../models/CategoriaModels');


class CategoryController {

static async getAllCategories(req,res){
    try {
            const [categories] = await Category.findAll()
            res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener las categorías');
    }
}


static async createCategory(req, res) {
    try {
        const { name, description } = req.body;
        await Category.createCategory(name, description);
        res.status(201).json({msg:'Categoría creada con éxito'});
    } catch (error) {
        res.status(500).json({msg:'Error al crear la categoría'});
    }
}




static async updateCategory(req,res){
    const { name, description } = req.body
    const { id} = req.params
    try {
      const exists =  await checkIfRecordExists("categorias", id)

        if(!exists){
            return res.status(404).json('Categoría no encontrada');
        }

          await Category.updateCategory(id,name, description)
        
        res.status(200).json('Categoría actualizada con éxito');

    } catch (error) {
        res.status(500).json('Error al actualizar la categoría');
    }
}


static async getOneCategory (req,res){
    try {
        const { id} = req.params;

        const exists =  await checkIfRecordExists("categorias", id)

        if(!exists){
            return res.status(404).json('Categoría no encontrada');
        }

       const category = await Category.findById(id)
       res.status(200).json(category);

    } catch (error) {
        res.status(500).json('Error al actualizar la categoría');
    }
}


static async deleteCategory(req, res){

    try {
        const {id} = req.params;
        const exists = await checkIfRecordExists('Categorias', id);
        if (!exists) {
            return res.status(404).send('Categoría no encontrada');
        }

        await Category.deleteCategory(id)
        res.status(200).json('Categoría eliminada con éxito');
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al eliminar la categoría');
    }


}



}


module.exports = CategoryController;