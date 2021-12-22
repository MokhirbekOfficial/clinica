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
const GetAdminClinics = `
SELECT 
    clinic_id,
    clinic_name
FROM
    clinics
WHERE
    clinic_admin = $1
`
const AddServices = `
INSERT INTO services
    (service_title,service_img,doctor_name,doctor_tel,ref_clinic)
VALUES 
    ($1,$2,$3,$4,$5)
`
const GetAdminServices = `
SELECT
    *
FROM
    services
WHERE
    ref_clinic = $1
`
const DeleteService = `
DELETE
FROM
    services
WHERE
    service_id = $1
`

const getOrders = () => fetchAll(GetOrders)
const getAdminId = (user_name)=> fetch(getAdmin, user_name)
const getAdminClinics = (clinic_admin)=> fetchAll(GetAdminClinics, clinic_admin)
const addServices = (service_title,service_img,doctor_name,doctor_tel,ref_clinic)=> fetch(AddServices, service_title,service_img,doctor_name,doctor_tel,ref_clinic)
const getAdminService = (ref_clinic)=> fetchAll(GetAdminServices, ref_clinic)
const deleteService = (service_id)=> fetch(DeleteService, service_id)

module.exports = {
    getOrders,
    getAdminId,
    getAdminClinics,
    addServices,
    getAdminService,
    deleteService
}