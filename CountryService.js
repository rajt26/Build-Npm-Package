const DbService = require('./DbService')
const Country = require('./Country')
module.exports = {
    async create(data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        return await DbService.create(Country, data, { isReturnCreated: true });
    },
    find(filter) {
        return DbService.find(Country, filter);
    },
    count(filter) {
        return DbService.count(Country, filter);
    },
    findOne(filter, options) {
        return DbService.findOne(Country, filter, options);
    },
    async destroy(query) {
        return await DbService.deleteOne(Country, query)
    },
    async softDelete(filter) {
        return await DbService.softDelete(Country, filter)
    },
    async update(filter, data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        let options = { query: filter, data }
        return DbService.findOneAndUpdate(Country, options, { isReturnUpdated: true })
    }
}