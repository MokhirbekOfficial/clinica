const { fetch, fetchAll } = require('../../lib/postgress')

const Services = `
    SELECT 
        * 
    FROM
        services
    where ref_clinic = $1
`
const AddClinics = `
INSERT INTO clinics
    (clinic_name, clinic_lacation,clinic_img,clinic_tel,clinic_admin)
VALUES
    ($1,$2,$3,$4,$5)
`
const services = (ref_clinic) => fetchAll(Services,ref_clinic)
const addClinic = (clinic_name, clinic_lacation,clinic_img,clinic_tel,clinic_admin) => fetch(AddClinics,clinic_name, clinic_lacation,clinic_img,clinic_tel,clinic_admin)
module.exports = {
    services,
    addClinic
}