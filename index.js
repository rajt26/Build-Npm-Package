const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const MasterService = require('./MasterService')
const _ = require('lodash')
const Master = require('./Master')
const CountryService = require('./CountryService')
const StateService = require('./StateService')
const CityService = require('./CityService')
const MasterValidationService = require('./MasterValidationService')
const UtilService = require('./UtilService')

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to mongodb")
    }

})
module.exports = {

    async master(action, params) {
        try {
            if (action == 'VIEW') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                else {
                    let master = await MasterService.findOne({ filter: { _id: params.id } })
                    if (master && master.id) {
                        return master
                    }
                    else {
                        return 'The requested resource could not be found but may be available again in the future'
                    }
                }

            }

            if (action == 'CREATE') {
                let isValid = MasterValidationService.validateRequiredCreateParams(params);
                if (!isValid) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                isValid = await MasterValidationService.validateName(params);
                if (!isValid) {
                    return 'Name / Code already registered, please try another'
                }
                isValid = MasterValidationService.ValidateInActiveDefault(params);
                if (!isValid) {
                    return 'Inactive master can not be set as default. Please active it first.'
                }
                let createdMaster = await MasterService.create(params, { isReturnCreated: true })
                if (createdMaster && createdMaster.id) {
                    return createdMaster
                }
                else {
                    return 'Failed To create master'
                }
            }


            if (action == 'UPDATE') {

                const isValid = MasterValidationService.validateRequiredUpdateParams(params);
                if (!isValid) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                else {
                    let options = _.cloneDeep(params);
                    options.exceptId = params.id;

                    const isValid = await MasterValidationService.validateName(options);
                    if (!isValid) {
                        return 'Name / Code already registered, please try another'
                    }
                    else {
                        const isValid = MasterValidationService.ValidateInActiveDefault(params);
                        if (!isValid) {
                            return 'Inactive master can not be set as default. Please active it first.'
                        }
                        else {
                            const filter = {
                                _id: params.id
                            }
                            let master = await Master.findOne(filter);
                            if (master && master.id) {
                                params && params.name ? params.slug = UtilService.slugify(params.name) : "";
                                params && params.name ? params.normalizeName = params.name.toLowerCase() : "";
                                if (params.likeKeyWords) {
                                    params.likeKeyWords = _.flattenDeep(params.likeKeyWords);
                                }
                                let response = await MasterService.update({ _id: master.id }, params)
                                return response
                            } else {
                                return 'Failed to update master'
                            }

                        }
                    }
                }
            }
            if (action == 'DELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                else {
                    let master = await Master.findOne({ _id: params.id })
                    if (master) {
                        let response = await MasterService.destroy({ _id: master.id })
                        if (response) {
                            return response
                        }
                    }
                    else {
                        return 'Failed to delete master'
                    }
                }

            }

            if (action == 'SOFTDELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                else {
                    let master = await Master.findOne({ _id: params.id })
                    if (master) {
                        let response = await MasterService.softDelete({ _id: master.id })
                        if (response) {
                            return response
                        }
                    }
                    else {
                        return 'Failed to soft delete in master'
                    }
                }

            }
        } catch (error) {
            console.log('error', error);
            return error
        }

    },

    async country(action, params) {
        try {
            if (action == 'CREATE') {
                let isCountry = await CountryService.findOne({ filter: { name: params.name } })
                if (isCountry) {
                    return "Country already exists."
                }
                else {
                    let country = await CountryService.create(params)
                    return country
                }
            }
            if (action == 'UPDATE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let country = await CountryService.findOne({ filter: { _id: params.id } })
                if (country) {
                    let country = await CountryService.update({ _id: params.id }, params)
                    return country
                }
            }
            if (action == 'DELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let country = await CountryService.findOne({ filter: { _id: params.id } })
                if (country) {
                    let response = await CountryService.destroy({ _id: params.id })
                    return response
                }
            }
            if (action == 'SOFTDELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let country = await CountryService.findOne({ where: { _id: params.id } })
                if (country) {
                    let response = await CountryService.softDelete({ _id: params.id })
                    return response
                }
            }
            if (action == 'VIEW') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let country = await CountryService.findOne({ where: { _id: params.id } })
                if (country) {
                    return country
                }
            }
        } catch (error) {
            return error
        }

    },

    async state(action, params) {
        try {
            if (action == 'CREATE') {
                let isState = await StateService.findOne({
                    filter: {
                        countryId: params.countryId,
                        name: params.name
                    }
                })
                if (isState) {
                    return "State already exists"
                } else {
                    let state = await StateService.create(params)
                    return state
                }
            }
            if (action == 'UPDATE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let state = await StateService.findOne({ filter: { _id: params.id } })
                if (state) {
                    let state = await StateService.update({ _id: params.id }, params)
                    return state
                }
            }
            if (action == 'DELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let state = await StateService.findOne({ filter: { _id: params.id } })
                if (state) {
                    let response = await StateService.destroy({ _id: params.id })
                    return response
                }
            }
            if (action == 'SOFTDELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let state = await StateService.findOne({ filter: { _id: params.id } })
                if (state) {
                    let response = await StateService.softDelete({ _id: params.id })
                    return response
                }
            }
            if (action == 'VIEW') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let state = await StateService.findOne({ where: { _id: params.id } })
                return state
            }
        } catch (error) {
            return error
        }

    },

    async city(action, params) {
        try {
            if (action == 'CREATE') {
                let isCity = await CityService.findOne({
                    filter: {
                        stateId: params.stateId,
                        name: params.name
                    }
                })
                if (isCity) {
                    return 'City already exists'
                } else {
                    let city = await CityService.create(params)
                    return city
                }

            }
            if (action == 'UPDATE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let city = await CityService.findOne({ filter: { _id: params.id } })
                if (city) {
                    let city = await CityService.update({ _id: params.id }, params)
                    return city
                }
            }
            if (action == 'DELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let city = await CityService.findOne({ where: { _id: params.id } })
                if (city) {
                    let response = await CityService.destroy({ _id: params.id })
                    return response
                }
            }
            if (action == 'SOFTDELETE') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let city = await CityService.findOne({ filter: { _id: params.id } })
                if (city) {
                    let response = await CityService.softDelete({ _id: params.id })
                    return response
                }
            }
            if (action == 'VIEW') {
                if (!params.id) {
                    return 'The request cannot be fulfilled due to bad syntax'
                }
                let city = await CityService.findOne({ filter: { _id: params.id } })
                return city
            }

        } catch (error) {
            return error
        }
    }

}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.listen(process.env.PORT, () => { console.log(`listening on ${process.env.PORT}`) })
