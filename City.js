const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
    name: {
        type: String
    },
    normalizeName: {
        type: String
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
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

module.exports = City = mongoose.model('City', CitySchema, 'City')