const {getOrders, getAdminId, getAdminClinics, addServices,getAdminService,deleteService} = require('./model')
const secret_key = 'CLINICS'
const jwt = require('jsonwebtoken')

module.exports = {
    getOrders: async(req, res) => {
        try {
            let {token} = req.body

            const decoded = jwt.verify(token, secret_key)

            const adminId = await getAdminId(decoded.user_name)
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
    },
    getAdminClinics: async(req, res) => {
        try {
            let {token} = req.body
            const decoded = jwt.verify(token, secret_key)
            const adminId = await getAdminId(decoded.user_name)
            const allClinicName= await getAdminClinics(adminId.user_id)
            res.json(allClinicName)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    addServices: async(req, res) => {
        try {
            let {service_title,service_img,doctor_name,doctor_tel,ref_clinic} = req.body
            await addServices(service_title,service_img,doctor_name,doctor_tel,ref_clinic)
            res.json('ok')
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    getAdminServices: async(req, res) => {
        try {
            let {token} = req.body
            const decoded = jwt.verify(token, secret_key)
            const adminId = await getAdminId(decoded.user_name)
            const allClinicName= await getAdminClinics(adminId.user_id)
            let senderObj = []
            for(let i=0; i<allClinicName.length; i++){
                let service = await getAdminService(allClinicName[i].clinic_id)
                for(let j=0; j<service.length; j++){
                    let obj = {
                        service_id: service[j].service_id,
                        service_title: service[j].service_title,
                        service_img: service[j].service_img,
                        doctor_name: service[j].doctor_name,
                        clinic_name: allClinicName[i].clinic_name
                    }
                    senderObj.push(obj)
                }
            }
            res.json(senderObj)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    deleteService: async(req, res) => {
        try {
            let {service_id} = req.body
            await deleteService(service_id)
            res.json('ok')
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    }
}