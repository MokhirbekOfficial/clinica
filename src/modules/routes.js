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
    .get('/superadmin/users', superAdmin.getUsers)
    .get('/superadmin/orders', superAdmin.getOrders)
    .get('/admins', users.getAdmin)

    .post('/admin/orders', admin.getOrders)
    .post('/register', users.addusers)
    .post('/login', users.checkuser)
    .post('/tokenchecker', token.tokenchecker)
    .post('/services', clinics.getServices)
    .post('/admin/services', admin.getAdminServices)
    .post('/add/services', admin.addServices)
    .post('/superadmin/create/admin', users.addusers)
    .post('/add/order', users.addOrder)
    .post('/user/getorders', users.getOrder)
    .post('/superadmin/addclinics', clinics.addClinic)
    .post('/getadmin/clinics', admin.getAdminClinics)

    .delete('/superadmin/order/delete', superAdmin.deleteOrder)
    .delete('/superadmin/user/delete', superAdmin.deleteUser)
    .delete('/superadmin/delete/clinics', superAdmin.deleteClinics)
    .delete('/admin/order/delete', superAdmin.deleteOrder)
    .delete('/admin/delete/service', admin.deleteService)
    
module.exports = router