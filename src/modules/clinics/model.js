const { fetch, fetchAll } = require('../../lib/postgress')

const Services = `
    SELECT 
        * 
    FROM
        services
    where ref_clinic = $1
`
const services = (ref_clinic) => fetchAll(Services,ref_clinic)

module.exports = {
    services
}