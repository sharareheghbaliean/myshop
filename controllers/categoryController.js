const Category = require('../models/categoryModel');
const Product = require('../models/productModel'); // برای استفاده در Include

// ۱. ایجاد دسته‌بندی جدید
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "وارد کردن نام دسته‌بندی الزامی است" });
    }
    const newCategory = await Category.create({ name });
    res.status(201).json({ message: "دسته‌بندی با موفقیت ایجاد شد", category: newCategory });
  } catch (error) {
    res.status(400).json({ message: "خطا در ایجاد دسته‌بندی", error: error.message });
  }
};

// ۲. دریافت همه دسته‌بندی‌ها
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت لیست دسته‌بندی‌ها", error: error.message });
  }
};

// ۳. دریافت یک دسته‌بندی به همراه تمام محصولات زیرمجموعه آن
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['id', 'name', 'price', 'stock'] // فقط فیلدهای مورد نیاز محصول را می‌آوریم
      }
    });

    if (!category) {
      return res.status(404).json({ message: "دسته‌بندی یافت نشد" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت اطلاعات دسته‌بندی", error: error.message });
  }
};

// ۴. ویرایش نام دسته‌بندی
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.update({ name }, { where: { id: req.params.id } });
    
    if (updated[0] === 0) {
      return res.status(404).json({ message: "دسته‌بندی یافت نشد یا تغییری اعمال نشد" });
    }
    res.status(200).json({ message: "دسته‌بندی با موفقیت بروزرسانی شد" });
  } catch (error) {
    res.status(400).json({ message: "خطا در بروزرسانی دسته‌بندی", error: error.message });
  }
};

// ۵. حذف دسته‌بندی
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: "دسته‌بندی یافت نشد" });
    }
    res.status(200).json({ message: "دسته‌بندی با موفقیت حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف دسته‌بندی", error: error.message });
  }
};
