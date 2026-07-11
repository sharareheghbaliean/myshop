const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);        // POST /categories
router.get('/', categoryController.getAllCategories);        // GET /categories
router.get('/:id', categoryController.getCategoryById);     // GET /categories/:id
router.put('/:id', categoryController.updateCategory);      // PUT /categories/:id
router.delete('/:id', categoryController.deleteCategory);   // DELETE /categories/:id

module.exports = router;
