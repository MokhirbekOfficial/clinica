const { fetch, fetchAll } = require('../../lib/postgress')

const AddUsers = `
INSERT INTO users
    (user_name, user_password,user_gmail,user_tel,is_admin)
VALUES
    ($1,$2,$3,$4,$5)
`

const GetUsers = `
SELECT 
    *
FROM
    users
`

const AddOrder = `
INSERT INTO orders
    (order_service, order_owner)
VALUES
    ($1,$2)
`

const GetAllOrders = `
SELECT 
    *
FROM
    orders
WHERE 
    order_owner = $1
`
const GetAllOrdersByService = `
SELECT 
    *
FROM
    orders
WHERE 
    order_service = $1
`
const GetOneUser = `
SELECT
    *
FROM 
    users
WHERE
    user_id = $1
`
const GetOneService = `
SELECT
    *
FROM 
    services
WHERE
    service_id = $1
`
const GetAdmins = `
SELECT
    user_id,
    user_name
FROM 
    users
WHERE
    is_admin = 'admin'
`


const addUsers = (user_name, user_password,user_gmail,user_tel,is_admin) => fetch(AddUsers,user_name, user_password,user_gmail,user_tel,is_admin)
const getUsers = () => fetchAll(GetUsers)
const getAdmin = () => fetchAll(GetAdmins)
const getAllOrders = (order_owner) => fetchAll(GetAllOrders, order_owner)
const serviceOrders = (order_service)=> fetchAll(GetAllOrdersByService, order_service)
const addOrder = (order_service, order_owner) => fetch(AddOrder,order_service,order_owner)
const getOneUser = (user_id) => fetch(GetOneUser, user_id)
const getOneService = (service_id) => fetch(GetOneService, service_id)

module.exports = {
    addUsers,
    getUsers,
    addOrder,
    getAllOrders,
    serviceOrders,
    getOneUser,
    getOneService,
    getAdmin
}