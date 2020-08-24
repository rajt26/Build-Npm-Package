"use strict";
const Master = require('./Master')
module.exports = {


    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateRequiredCreateParams: (params) => {
        let isValid = false;
        if (params
            && params.name
            && params.code) {
            isValid = true
        }
        return isValid;
    },

    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateRequiredUpdateParams: (params) => {
        let isValid = false;
        if (params
            && params.id) {
            isValid = true
        }
        return isValid;
    },

    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateRequiredSequenceUpdateParams: (params) => {
        let isValid = false;
        if (params
            && params.sequences) {
            isValid = true
        }
        return isValid;
    },

    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateRequiredActivateParams: (params) => {
        let isValid = false;
        if (params
            && _.has(params, 'isActive')
            && params.masters) {
            isValid = true
        }
        return isValid;
    },

    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateRequiredBulkDestroyParams: (params) => {
        let isValid = false;
        if (params
            && params.masters) {
            isValid = true
        }
        return isValid;
    },


    /**
     * @description validate mobile number of user
     * @param options "{
     *                      "name":<string>,
      *                     "exceptId":<string>
     *                 }"
     * @param callback
     */
    validateName: async (options) => {
        let filter = {
            '$and': []
        };
        let orArray = []
        // validate by name
        if (options && options.name) {
            orArray.push({ name: options.name })
        }
        // validate by code
        if (options && options.code) {
            orArray.push({ code: options.code })
        }
        filter['$and'].push({ '$or': orArray })
        // validate by parent
        if (options && options.parentId) {
            filter['$and'].push({ parentId: options.parentId })
        }
        else {
            filter['$and'].push({ parentId: null })
        }

        // for updating record check same criteria
        // except self master id
        if (options && options.exceptId) {
            filter['$and'].push({ _id: { '$ne': options.exceptId } })
        }

        let isInvalidMaster = await Master.findOne(filter);
        return isInvalidMaster ? false : true

    },

    /**
     * @description set in active master as default
     * @param options
     * @constructor
     */
    ValidateInActiveDefault: (options) => {
        let isValid = true;
        if (!options.isActive && options.isDefault) {
            isValid = false
        }
        else {
            isValid = true;
        }

        return isValid;
    },

    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateListByCodeParams: (options) => {
        let isValid = false;
        if (options
            && options.masters) {
            isValid = true
        }
        return isValid;
    },

    /**
     * @description validate required parameter(s)
     * @param params
     * @return {boolean}
     */
    validateDeleteDependencyCheckParams: (params) => {
        let isValid = false;
        if (params
            && params._id
            && params.type) {
            isValid = true
        }
        return isValid;
    }


};