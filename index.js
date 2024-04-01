const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
 const userRoutes = require('./routes/useRouter');
 const roleRoutes = require('./routes/roleRoutes');
 const categoryRoutes = require('./routes/categoryRoutes');
 const productRoutes = require('./routes/productRouter');
 const saleDetailRoutes = require('./routes/saleDetailRoutes');
 const sales = require('./routes/saleRoutes');



const app = express();

http://localhost:4000/api/categories

app.use(express.json());
app.use(cors())
app.use(morgan("dev"));
app.use(userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/saleDetails', saleDetailRoutes);
app.use('/api/sales', sales);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
