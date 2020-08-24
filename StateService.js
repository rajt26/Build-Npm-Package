const DbService = require('./DbService')
const State = require('./State')
module.exports = {
    async create(data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        return await DbService.create(State, data, { isReturnCreated: true });
    },
    find(filter) {
        return DbService.find(State, filter);
    },
    count(filter) {
        return DbService.count(State, filter);
    },
    findOne(filter, options) {
        return DbService.findOne(State, filter, options);
    },
    async destroy(query) {
        return await DbService.deleteOne(State, query)
    },
    async softDelete(filter) {
        return await DbService.softDelete(State, filter)
    },
    async update(filter, data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        let options = { query: filter, data }
        return DbService.findOneAndUpdate(State, options, { isReturnUpdated: true });
    }
}