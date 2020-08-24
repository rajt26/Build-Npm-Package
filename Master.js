const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MasterSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String
    },
    normalizeName: {
        type: String
    },
    slug: {
        type: String
    },
    code: {
        type: String
    },
    group: {
        type: String
    },
    description: {
        type: String
    },

    isActive: {
        type: Boolean,
        default: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    sortingSequence: {
        type: Number
    },

    image: {
        type: String
    },
    icon: {
        type: String
    },

    // self relation
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },

    likeKeywords: [{
        type: String
    }],

    // fetching masters related to parent
    subMasters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    }],

    isDeleted: {
        type: Boolean,
        default: false
    },
    multiLanguageData: {
        type: Object
    }

}, { timestamps: true })

module.exports = Master = mongoose.model('Master', MasterSchema, 'Master')
