const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StateSchema = new Schema({
    name: {
        type: String
    },
    normalizeName: {
        type: String
    },
    STDCode: {
        type: String
    },
    stateCode: {
        type: String
    },
    stateType: {
        type: String
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },

    Remark: {
        type: String
    },

    isActive: {
        type: Boolean,
        defaultsTo: true
    },

    isDeleted: {
        type: Boolean,
        defaultsTo: false
    },

    // HK-fields
    hkId: {
        type: String
    },
    hkExtra: {
        type: JSON,
        columnType: Object
    },
    updateIp: {
        type: String
    },
    createIp: {
        type: String
    },

})

module.exports = State = mongoose.model('State', StateSchema, 'State')