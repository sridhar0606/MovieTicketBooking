const express = require('express')

const UserCtrl = require('../controllers/user_ctrl')

const router = express.Router()

router.post('/Createuser',UserCtrl.Createuser)


module.exports = router