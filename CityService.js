const DbService = require('./DbService')
const City = require('./City')
module.exports = {
    async create(data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        return await DbService.create(City, data, { isReturnCreated: true });
    },
    find(filter) {
        return DbService.find(City, filter);
    },
    count(filter) {
        return DbService.count(City, filter);
    },
    findOne(filter, options) {
        return DbService.findOne(City, filter, options);
    },
    async destroy(query) {
        return await DbService.deleteOne(City, query)
    },
    async softDelete(query) {
        return await DbService.softDelete(City, query)
    },
    async update(filter, data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        let options = { query: filter, data }
        return DbService.findOneAndUpdate(City, options, { isReturnUpdated: true });
    }
}