const SaleDetail = require('../models/saleDetailModel');

class SaleDetailController {

    static async getAllSaleDetails(req, res) {
      try {
        const [saleDetails] = await SaleDetail.findAll();
        res.status(200).json(saleDetails);
      } catch (error) {
        res.status(500).send('Error al obtener los detalles de ventas');
      }
    }


    static async createSaleDetail(req, res) {
        try {
            const { saleId, productId, quantity, price } = req.body;
            const saleDetail = new SaleDetail(saleId, productId, quantity, price);
            await saleDetail.save();
            res.status(201).send('Detalle de venta creado con éxito');
        } catch (error) {
            res.status(500).send('Error al crear el detalle de venta');
        }
    }

    static async updateSaleDetail(req, res) {
      try {
          const { id } = req.params; // El ID del detalle de venta a actualizar
          const { saleId, productId, quantity, price } = req.body;

          const [affectedRows] = await SaleDetail.update(id, saleId, productId, quantity, price);

          if (affectedRows === 0) {
              return res.status(404).send('Detalle de venta no encontrado.');
          }

          res.status(200).send('Detalle de venta actualizado con éxito.');
      } catch (error) {
          res.status(500).send('Error al actualizar el detalle de venta.');
      }
  }

  static async deleteSaleDetail(req, res) {
    try {
        const { id } = req.params; // El ID del detalle de venta a eliminar

        const [affectedRows] = await SaleDetail.delete(id);

        if (affectedRows === 0) {
            return res.status(404).send('Detalle de venta no encontrado.');
        }

        res.status(200).send('Detalle de venta eliminado con éxito.');
    } catch (error) {
        res.status(500).send('Error al eliminar el detalle de venta.');
    }
}

}


module.exports = SaleDetailController;