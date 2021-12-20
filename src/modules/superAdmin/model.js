const { fetch, fetchAll } = require('../../lib/postgress')

const GetUsers = `
SELECT 
    *
FROM
    users
where is_admin != 'super'
`

const GetOrders = `
SELECT
    order_id,
    clinic_name,
    service_title,
    order_time,
    user_name,
    user_tel,
    user_gmail,
    doctor_name
FROM
    orders
LEFT JOIN services
    ON order_service = service_id
LEFT JOIN users
    ON order_owner = user_id
LEFT JOIN clinics
    ON ref_clinic = clinic_id
ORDER BY order_time
`

const DeleteUser = `
DELETE 
FROM
    users
WHERE
    user_id = $1
`
const DeleteOrder = `
DELETE 
FROM
    orders
WHERE
    order_id = $1
`

const DeleteClinics = `
DELETE
FROM
    clinics
WHERE
    clinic_id = $1
`
const getUsers = () => fetchAll(GetUsers)
const getOrders = () => fetchAll(GetOrders)
const deleteUser = (user_id) => fetch(DeleteUser, user_id)
const deleteOrder = (order_id) => fetch(DeleteOrder, order_id)
const deleteClinics = (clinic_id) => fetch(DeleteClinics, clinic_id)
module.exports = {
    getUsers,
    getOrders,
    deleteUser,
    deleteOrder,
    deleteClinics
}