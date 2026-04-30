const UserService = require("../services/UserService");
const UserDTO = require("../dto/UserDTO");
const asyncHandler = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const user = await UserService.register(req.body);
  res.status(201).json({
    success: true,
    data: UserDTO.fromEntity(user),
  });
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const result = await UserService.verifyEmail(email, code);
  res.status(200).json({ success: true, ...result });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserService.login(email, password);
  res.status(200).json({ success: true, ...result });
});

exports.verifyForgotPasswordCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const result = await UserService.verifyForgotPasswordCode(email, code);
  res.status(200).json({ success: true, ...result });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await UserService.forgotPassword(email);
  res.status(200).json({ success: true, ...result });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  const result = await UserService.resetPassword(email, newPassword);
  res.status(200).json({ success: true, ...result });
});

exports.getAll = asyncHandler(async (req, res) => {
  const users = await UserService.getAll();
  res.status(200).json({ success: true, data: UserDTO.fromEntityList(users) });
});

exports.getById = asyncHandler(async (req, res) => {
  const user = await UserService.findById(req.params.id);
  res.status(200).json({ success: true, data: UserDTO.fromEntity(user) });
});

exports.update = asyncHandler(async (req, res) => {
  const user = await UserService.update(req.user.id, req.body);
  res.status(200).json({ success: true, data: UserDTO.fromEntity(user) });
});

exports.delete = asyncHandler(async (req, res) => {
  await UserService.delete(req.params.id);
  res.status(204).send({message: "User deleted successfully"});
});

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await UserService.getStats(req.user.id);
  res.status(200).json({ success: true, data: stats });
});
