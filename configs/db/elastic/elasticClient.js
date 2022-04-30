const {Client} = require('@elastic/elasticsearch');
const {logger} = require('.././../winstonLogger/winstonLogger')

const elasticClient = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true
  })

elasticClient.info().then((res) => {
    logger.info(`Elasticsearch is running... name:${res.name}, cluster_name:${res.cluster_name}`)
}).catch((err) => {
    logger.error(`Elasticsearch is failed!!!`,{message:err.message})
})

module.exports = {elasticClient};