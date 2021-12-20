const {getOrders, getAdminId} = require('./model')
const secret_key = 'CLINICS'
const jwt = require('jsonwebtoken')

module.exports = {
    getOrders: async(req, res) => {
        try {
            let {token} = req.body

            const decoded = jwt.verify(token, secret_key)
            const adminId = await getAdminId(decoded.userName)
            const allOrders= await getOrders()
            let newOrdres = []
            for(let i=0; i<allOrders.length; i++){
                if(allOrders[i].clinic_admin == adminId.user_id){
                    newOrdres.push(allOrders[i])
                }
            }
            res.json(newOrdres)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    }
}