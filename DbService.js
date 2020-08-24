const _ = require('lodash')
module.exports = {

    async create(model, options) {
        try {
            options = new model(options);
            options = await options.save();
            return options;
        } catch (error) {
            console.log('error', error);
            return "error"
        }
    },

    async find(model, options) {
        try {
            let { filter, project, populate, sort, limit, skip } = options
            let results = await model.find(filter, project).skip(skip).limit(limit).populate(populate).sort(sort);
            return results;
        } catch (error) {
            console.log('error', error);
            return 'error'


        }

    },

    async findOne(model, options) {
        try {
            let { filter, project, populate } = options
            let results = await model.findOne(filter, project).populate(populate);
            return results;
        } catch (error) {
            console.log('error', error);
            return 'error'

        }
    },

    async updateOne(model, options) {
        try {
            let { query, data } = options
            let results = await model.updateOne(query, data)
            console.log('results', results);
            return results;
        } catch (error) {
            console.log('error', error);
            return 'error'
        }
    },

    async findOneAndUpdate(model, options) {
        try {
            let { query, data } = options
            let results = await model.findOneAndUpdate(query, data, { new: true })
            console.log('results', results);
            return results;
        } catch (error) {
            console.log('error', error);
            return 'error'
        }

    },
    async updateMany(model, options, res) {
        try {
            let { query, update } = options
            let results = await model.updateMany(query, update);
            return results;
        } catch (error) {
            console.log('error', error);
            return 'error'
        }
    },

    async deleteOne(model, options) {
        try {
            let result = await model.deleteOne(options)
            return result
        } catch (error) {
            console.log('error', error);
            return "error"
        }
    },

    async aggregate(model, pipeline) {
        try {
            let results = await model.aggregate(pipeline)
            return results
        } catch (error) {
            console.log('error', error);
            return 'error'

        }
    },
    async softDelete(model, criteria, update = { isDeleted: true }) {
        try {
            return await model.updateOne(criteria, update);
        } catch (e) {
            throw e;
        }
    }

};
