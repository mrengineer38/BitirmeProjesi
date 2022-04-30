const {elasticClient} = require('./elasticClient');

const addMappingToIndex = async function(indexName,mapping){
    try {
        return await elasticClient.indices.putMapping({
            index:indexName,
            body:mapping
        })
    } catch (error) {
        console.error({
            location:"mapping.js",
            error:error
        })
    }
}

module.exports = {addMappingToIndex}