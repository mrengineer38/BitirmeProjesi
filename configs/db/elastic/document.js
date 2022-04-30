const {elasticClient} = require("./elasticClient");

const insertDoc = async (indexName,data)=>{
    return await elasticClient.index({
        index:indexName,
        body:data
    })
}

module.exports ={insertDoc};