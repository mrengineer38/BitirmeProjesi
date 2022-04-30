const {elasticClient} = require('./elasticClient');

const createIndex = async(indexName)=>{
    try {
        return await elasticClient.indices.get({
            index:indexName
        });
    } catch (error) {
        return await elasticClient.indices.create({
            index:indexName
        })
    }
}

module.exports = {createIndex};