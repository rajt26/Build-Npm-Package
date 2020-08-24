const DbService = require('./DbService')
const Master = require('./Master');
const _ = require('lodash')

module.exports = {

    async create(data) {
        if (!data.sortingSequence) {
            let maxSequence = await Master.find({ _id: { "$ne": null } })
                .sort({ sortingSequence: -1 })
                .limit(1)
            if (maxSequence && maxSequence.length) {
                data.sortingSequence = _.first(maxSequence).sortingSequence + 1;
            }
            else {
                data.sortingSequence = 1;
            }
        }
        if (data.parentId) {
            let parentMaster = await this.findOne({ filter: { id: data.parentId } });
            if (!parentMaster || !parentMaster.code) {
                throw new Error("Parent master not found.");
            }
            data.parentCode = parentMaster.code;
        }
        if (data.name) data.normalizeName = data.name.toLowerCase();
        return await DbService.create(Master, data, { isReturnCreated: true });
    },

    async update(query, data) {
        if (data.name) data.normalizeName = data.name.toLowerCase();
        if (data.parentId) {
            let parentMaster = await this.findOne({ id: data.parentId });
            if (!parentMaster || !parentMaster.code) {
                return res.notFound(null, { message: "Parent master not found." });
            }
            data.parentCode = parentMaster.code;
        }
        let options = {
            query, data
        }
        return DbService.findOneAndUpdate(Master, options, { isReturnUpdated: true })
    },

    async destroy(query) {
        return await DbService.deleteOne(Master, query)
    },

    async softDelete(query) {
        return await DbService.softDelete(Master, query)
    },
    async findOne(filter, options) {
        return DbService.findOne(Master, filter, options);
    },
    async find(filter) {
        return DbService.find(Master, filter);
    },
}