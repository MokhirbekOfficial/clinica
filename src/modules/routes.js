const { Router } = require('express')
const router = new Router()

const home = require('./home/home')
const users = require('./users/users')
const clinics = require('./clinics/clinics')
const superAdmin = require('./superAdmin/superAdmin')
const admin = require('./admin/admin')
const token = require('./token/token')

router
    .get('/', home.getClinics)
    .get('/admin/orders', admin.getOrders)
    .get('/superadmin/users', superAdmin.getUsers)
    .get('/superadmin/orders', superAdmin.getOrders)

    .post('/register', users.addusers)
    .post('/login', users.checkuser)
    .post('/tokenchecker', token.tokenchecker)
    .post('/services', clinics.getServices)
    .post('/superadmin/create/admin', users.addusers)
    .post('/add/order', users.addOrder)

    .delete('/superadmin/order/delete', superAdmin.deleteOrder)
    .delete('/superadmin/user/delete', superAdmin.deleteUser)
    .delete('/superadmin/delete/clinics', superAdmin.deleteClinics)
    .delete('/admin/order/delete', superAdmin.deleteOrder)
    
module.exports = router