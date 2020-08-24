const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountrySchema = new Schema({
    name: {
        type: String
    },
    normalizeName: {
        type: String
    },
    code: {
        type: String
    },
    ISDCode: {
        type: String
    },
    timeZone: {
        type: String
    },
    localIsoTime: {
        type: String
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

module.exports = Country = mongoose.model('Country', CountrySchema, 'Country')