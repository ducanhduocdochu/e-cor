'use strict'

const { BadRequestError } = require('../core/error.response')
const { inventory } = require('../models/inventory.model')
const {product, clothing, electronic, furniture} = require('../models/product.model')
const { findAllDraftsForShop, publishProductByShop, findAllPublishForShop, unPublishProductByShop, searchProductByUser, findAllProducts, findProduct, updateProductById } = require('../models/repositories/product.repo')
const { insertInventory } = require('../models/repositories/inventory.repo')
const { removeUndefinedObject, updateNestedObjectParser } = require('../utils')

class ProductFactory{
    static productRegistry = {}

    static registerProductType(type, classRef){
        ProductFactory.productRegistry[type] = classRef
    }
    
    static async createProduct(type, payload){
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)

        return new productClass(payload).createProduct1()
    }

    static async updateProduct(type, product_id, payload){
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)

        return new productClass(payload).updateProduct1({product_id})
    }
    
    // PUT
    static async publishProductByShop({product_shop, product_id}){
        return await publishProductByShop({product_shop, product_id})

    }static async unPublishProductByShop({product_shop, product_id}){
        return await unPublishProductByShop({product_shop, product_id})
    }
    // END PUT
    // QUERY
    static async findAllDraftsForShop({product_shop, limit = 50, skip = 0}){
        const query = {product_shop, isDraft: true}
        return await findAllDraftsForShop({query, limit, skip})
    }

    static async findAllPublishForShop({product_shop, limit = 50, skip = 0}){
        const query = {product_shop, isPublished: true}
        return await findAllPublishForShop({query, limit, skip})
    }

    static async searchProducts({keySearch}){
        return await searchProductByUser({keySearch})
    }

    static async findAllProducts({limit = 50, sort = 'ctime', page = 1, filter = {isPublished: true}}){
        return await findAllProducts({limit, sort, page, filter, select: ['product_name', 'product_price', 'product_thumb']})
    }

    static async findProduct({product_id}){
        return await findProduct({product_id, unSelect: ['__v']})
    }
    // END QUERY
} 

// define base product class
class Product{
    constructor ({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    })
    {
        this.product_name = product_name,
        this.product_thumb = product_thumb,
        this.product_description = product_description,
        this.product_price = product_price,
        this.product_type = product_type,
        this.product_shop = product_shop,
        this.product_attributes = product_attributes
        this.product_quantity = product_quantity
    }

    async createProduct(product_id){
        const newProduct = await product.create({...this, _id: product_id})
        if (newProduct){
            await insertInventory({
                product_id: newProduct._id, 
                shop_id: this.product_shop,
                stock: this.product_quantity,
            })
        }

        return newProduct
    }

    async updateProduct(product_id, payload){
        return await updateProductById({product_id, payload, model: product})
    }

}

//  Define sub class for different product type Clothing

class Clothing extends Product{
    async createProduct1(){
        const newClothing = await clothing.create({
            ...this.product_attributes, 
            product_shop: this.product_shop
        })
        if (!newClothing) throw new BadRequestError('create new Clothing error')
        
        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('create new Product error')

        return newProduct
    }

    async updateProduct1({product_id}){
        const objectParams = removeUndefinedObject(this)
        if (objectParams.product_attributes){
            // update child
            await updateProductById({product_id, payload: updateNestedObjectParser(objectParams.product_attributes),  model: clothing})
        }
        const updateProduct = await super.updateProduct(product_id, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

//  Define sub class for different product type Electronic


class Electronic extends Product{
    async createProduct1(){
        const newElectronic = await electronic.create({
            ...this.product_attributes, 
            product_shop: this.product_shop
        })
        if (!newElectronic) throw new BadRequestError('create new Electronic error')
        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('create new Product error')

        return newProduct
    }
}

class Furniture extends Product{
    async createProduct1(){
        const newFurniture = await furniture.create({
            ...this.product_attributes, 
            product_shop: this.product_shop
        })

        if (!newFurniture) throw new BadRequestError('create new Furniture error')
        console.log(newFurniture._id)
        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) throw new BadRequestError('create new Furniture error')

        return newProduct
    }
}

ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory;