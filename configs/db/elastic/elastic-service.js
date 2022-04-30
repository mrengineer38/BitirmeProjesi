const { elasticClient } = require('./elasticClient');
const { createIndex } = require('./index');
const { addMappingToIndex } = require('./mapping');
const { insertDoc } = require('./document');
const {productMap} = require('./productMapping');
const indexName = "patetescipsi"



async function insertProduct(data){
    const indexResult = await createIndex("patetescipsi");
    const mappingResponse = await addMappingToIndex("patetescipsi", productMap);
    return await insertDoc('patetescipsi', data);

}


async function searchProduct(searchQuery){
    return await elasticClient.search({
        index:indexName,
        q:searchQuery,
    })
}

async function updateProductByDocumentId(id,newValues){
    return await elasticClient.update({
        index:indexName,
        id:id,
        doc:newValues
    })
}

async function searchByProductId(productId){
    const documents = await elasticClient.search({
        index:indexName,
        q:productId,
    })
    return  documents.hits.hits.find(item=> item._source.id == productId);
}

async function updateProductBySelfId(productId,newValues){
    let handledProduct = await searchByProductId(productId);
    if(handledProduct != undefined){
       return await updateProductByDocumentId(handledProduct._id,newValues).then(res=>res).catch(err=>err)
    }
    return `Product couldn't find by this id: ${productId}`;
}

async function deleteProductById(productId){
    let handledProduct =  await searchByProductId(productId);
    if(handledProduct != undefined){
        return await deleteByDocumentId(handledProduct._id).then(res=>res).catch(err=>err);
    }
    return `Product couldn't find by this id: ${productId}`;
}

async function deleteByDocumentId(id){
    id = id.toString();
    return await elasticClient.delete({
            index:indexName,
            id:id
    })
}

module.exports = {
    insertProduct,
    searchProduct,
    updateProductByDocumentId,
    updateProductBySelfId,
    deleteByDocumentId,
    deleteProductById
}