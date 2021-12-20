const { Router } = require('express')
const router = new Router()

const home = require('./home/home')
const users = require('./users/users')
const clinics = require('./clinics/clinics')
const superAdmin = require('./superAdmin/superAdmin')
const admin = require('./admin/admin')

router
    .get('/', home.getClinics)
    .post('/register', users.addusers)
    .post('/login', users.checkuser)
    .get('/services', clinics.getServices)
    .get('/superadmin/users', superAdmin.getUsers)
    .get('/superadmin/orders', superAdmin.getOrders)
    .delete('/superadmin/order/delete', superAdmin.deleteOrder)
    .delete('/superadmin/user/delete', superAdmin.deleteUser)
    .delete('/superadmin/delete/clinics', superAdmin.deleteClinics)
    .get('/admin/orders', admin.getOrders)
    .delete('/admin/order/delete', superAdmin.deleteOrder)
    .post('superadmin/create/admin', users.addusers)
module.exports = router