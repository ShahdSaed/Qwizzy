const ResultService = require("../services/ResultService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const results = await ResultService.getAll();
  res.status(200).json({ success: true, data: results });
});

exports.getById = asyncHandler(async (req, res) => {
  const result = await ResultService.findById(req.params.id);
  res.status(200).json({ success: true, data: result });
});

exports.create = asyncHandler(async (req, res) => {
  const result = await ResultService.create(req.body);
  res.status(201).json({ success: true, data: result });
});

exports.update = asyncHandler(async (req, res) => {
  const result = await ResultService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: result });
});

exports.delete = asyncHandler(async (req, res) => {
  await ResultService.delete(req.params.id);
  res.status(204).send();
});