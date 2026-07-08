const db = require('../config/database');
const User = require('../models/userModel');

// ایجاد کاربر جدید (ثبت‌نام)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // در اینجا باید در آینده کتابخانه bcrypt برای هش کردن پسورد اضافه شود
    const newUser = await User.create({ name, email, password, role });
    
    res.status(201).json({ message: "کاربر با موفقیت ساخته شد", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "خطا در ایجاد کاربر", error: error.message });
  }
};

// دریافت تمام کاربران
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت کاربران", error: error.message });
  }
};

// دریافت یک کاربر بر اساس ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت کاربر", error: error.message });
  }
};

// ویرایش اطلاعات کاربر
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: "کاربر یافت نشد یا تغییری اعمال نشد" });
    
    res.status(200).json({ message: "کاربر با موفقیت بروزرسانی شد" });
  } catch (error) {
    res.status(400).json({ message: "خطا در بروزرسانی کاربر", error: error.message });
  }
};

// حذف کاربر
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "کاربر یافت نشد" });
    
    res.status(200).json({ message: "کاربر با موفقیت حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف کاربر", error: error.message });
  }
};
