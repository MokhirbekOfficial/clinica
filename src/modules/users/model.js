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

const addUsers = (user_name, user_password,user_gmail,user_tel,is_admin) => fetch(AddUsers,user_name, user_password,user_gmail,user_tel,is_admin)

const getUsers = () => fetchAll(GetUsers)

const addOrder = (order_service, order_owner) => fetch(AddOrder,order_service,order_owner)
module.exports = {
    addUsers,
    getUsers,
    addOrder
}