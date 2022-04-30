    //Create product Map
    const productMap = {
        properties: {
            id: {
                type: "integer"
            },
            title: {
                type: "text"
            },
            descript: {
                type: "text"
            },
            price: {
                type: "long"
            },
            created:{
                type:"text"
            },
            modified:{
                type:"text"
            },
            category_id: {
                type: "long"
            },
            inventory_id: {
                type: "long"
            },
            discount_id: {
                type: "long"
            }
        }
    }

module.exports = {productMap}