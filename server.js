const express = require('express');
const app = express();

app.use(express.json());


const sequelize = require('./config/database');

// وصل کردن روت‌ها
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/categories', categoryRoutes);

/*


const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);
*/
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database & tables created successfully');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.log('Error syncing database:', error);
  });



  
// const Category = require('./models/categoryModel');
//   sequelize.sync().then(async () => {
//   // چک می‌کنیم اگر دسته‌بندی وجود ندارد، بسازد
//   const count = await Category.count();
//   if (count === 0) {
//     await Category.bulkCreate([
//       { name: 'موبایل' },
//       { name: 'لپ‌تاپ' }
//     ]);
//     console.log('دسته‌بندی‌های اولیه اضافه شدند.');
//   }

//   app.listen(3000, () => {
//       console.log('Server is running on port 3000');
//     });
// });