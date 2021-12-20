const { clinics } = require('./model')

module.exports = {
    getClinics: async(req, res) => {
        try {
            const allClinics = await clinics()
            res.json(allClinics)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    }
}