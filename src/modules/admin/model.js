const { fetch, fetchAll } = require('../../lib/postgress')

const GetOrders = `
SELECT
    order_id,
    clinic_name,
    service_title,
    order_time,
    user_name,
    user_tel,
    user_gmail,
    doctor_name,
    clinic_admin
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
const getAdmin = `
SELECT
    user_id
FROM 
    users
WHERE
    user_name = $1
`
const getOrders = () => fetchAll(GetOrders)

const getAdminId = (user_name)=> fetch(getAdmin, user_name)

module.exports = {
    getOrders,
    getAdminId
}