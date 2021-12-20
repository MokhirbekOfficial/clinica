const { services } = require('./model')

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
    }
}