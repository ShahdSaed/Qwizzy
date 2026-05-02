const CategoryService = require("../services/CategoryService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const categories = await CategoryService.getAll();
  res.status(200).json({ success: true, data: categories });
});

exports.getById = asyncHandler(async (req, res) => {
  const category = await CategoryService.findById(req.params.id);
  res.status(200).json({ success: true, data: category });
});

exports.create = asyncHandler(async (req, res) => {
  const category = await CategoryService.create(req.body);
  res.status(201).json({ success: true, data: category });
});

exports.update = asyncHandler(async (req, res) => {
  const category = await CategoryService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: category });
});

exports.delete = asyncHandler(async (req, res) => {
  await CategoryService.delete(req.params.id);
  res.status(204).send();
});