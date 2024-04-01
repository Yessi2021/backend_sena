const express = require('express');
const RoleController = require('../controllers/roleController');

const router = express.Router();

router.get('/', RoleController.getAllRoles);
router.post('/', RoleController.createRole);



module.exports = router;
