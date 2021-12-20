const { fetch, fetchAll } = require('../../lib/postgress')

const Clinics = `
    SELECT 
        * 
    FROM
        clinics
`
const clinics = () => fetchAll(Clinics)

module.exports = {
    clinics
}