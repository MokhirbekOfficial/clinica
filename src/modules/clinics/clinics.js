const { services, addClinic } = require('./model')

module.exports = {
    getServices: async(req, res) => {
        try {
            let {ref_clinic} = req.body
            const allServices = await services(ref_clinic)
            res.json(allServices)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    addClinic: async(req, res) => {
        try {
            let {clinic_name, clinic_location,clinic_img,clinic_tel,clinic_admin} = req.body
            await addClinic(clinic_name, clinic_location,clinic_img,clinic_tel,clinic_admin)
            res.json('ok')
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    }
}