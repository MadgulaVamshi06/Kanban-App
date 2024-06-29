const express = require('express');
const adminRouter = express.Router();
const auth = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');
const { register, delete: deleteNote } = require('../controllers/admin.controller');


adminRouter.post("/register",register)


adminRouter.delete("/delete/:noteId",checkRole, auth, deleteNote)


module.exports = adminRouter ;