'use strict'

const { BadRequestError } = require('../core/error.response')
// const { inventory } = require('../models/inventory.model')
const {product, clothing, electronic, furniture} = require('../models/product.model')
const { findAllDraftsForShop, publishProductByShop, findAllPublishForShop, unPublishProductByShop, searchProductByUser, findAllProducts, findProduct, updateProductById, findProductById, deleteProductById, deleteAttributeProductById } = require('../models/repositories/product.repo')
// const { insertInventory } = require('../models/repositories/inventory.repo')
const { removeUndefinedObject, updateNestedObjectParser } = require('../utils')

class ProductFactory{
    static productRegistry = {}

    static registerProductType(type, classRef){
        ProductFactory.productRegistry[type] = classRef
    }
    static async createProduct({_id},{type}, payload){
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)
        return new productClass(type, payload, _id).createProduct1()
    }

    static async updateProduct({product_id}, payload){
        const foundProduct = await findProductById({product_id})
        const productClass = ProductFactory.productRegistry[foundProduct.product_type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${foundProduct.product_type}`)
        return new productClass(foundProduct.product_type, payload, foundProduct.shop_id).updateProduct1({product_id})
    }

    static async deleteProduct({product_id}){
        const foundProduct = await findProductById({product_id})
        const productClass = ProductFactory.productRegistry[foundProduct.product_type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${foundProduct.product_type}`)
        return new productClass(foundProduct.product_type,{...foundProduct},foundProduct.shop_id).deleteProduct1({product_id})
    }
    
    // PUT
    static async publishProductByShop({product_id}){
        return await publishProductByShop({product_id})

    }static async unPublishProductByShop({ product_id}){
        return await unPublishProductByShop({ product_id})
    }
    // END PUT
    // QUERY

    static async getAllProductsForShop({shop_id},{limit = 50, sort = 'ctime', page = 1}){
        return await findAllProducts({limit, sort, page, filter: {shop_id}, select: ['product_name', 'product_price', 'product_thumb']})
    }

    static async getAllDraftsForShop({_id},{limit = 50, sort = 'ctime', page = 1}){
        return await findAllProducts({limit, sort, page, filter: {isDraft: true, shop_id: _id}, select: ['product_name', 'product_price', 'product_thumb']})
    }

    static async getAllPublishForShop({_id},{limit = 50, sort = 'ctime', page = 1}){
        return await findAllProducts({limit, sort, page, filter: {isDraft: false, shop_id: _id}, select: ['product_name', 'product_price', 'product_thumb']})
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
    constructor (type, {
        product_name,
        product_thumb,
        product_description,
        category_id,
        product_price,
        product_attributes
    }, shop_id)
    {
        this.product_name = product_name,
        this.product_thumb = product_thumb,
        this.product_description = product_description,
        this.product_price = product_price,
        this.category_id = category_id,
        this.product_attributes = product_attributes
        this.shop_id = shop_id
        this.product_type = type
    }
    async createProduct(product_id){
        const newProduct = await product.create({...this, _id: product_id})
        // if (newProduct){
        //     await insertInventory({
        //         product_id: newProduct._id, 
        //         shop_id: this.product_shop,
        //         stock: this.product_quantity,
        //     })
        // }
        return newProduct
    }
    async updateProduct(product_id, payload){
        return await updateProductById({product_id, payload, model: product})
    }

    async deleteProduct(product_id){
        return await deleteProductById({product_id})
    }
}

//  Define sub class for different product type Clothing

class Clothing extends Product{
    async createProduct1(){
        const newClothing = await clothing.create({
            ...this.product_attributes, 
            shop_id: this.shop_id
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

    async deleteProduct1({product_id}){
        return {
            product: await super.deleteProduct(product_id),
            model:deleteAttributeProductById({product_id, model: clothing})
        }
    }
}

class Electronic extends Product{
    async createProduct1(){
        const newElectronic = await electronic.create({
            ...this.product_attributes, 
            shop_id: this.shop_id
        })
        if (!newElectronic) throw new BadRequestError('create new Electronic error')
        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('create new Product error')
        return newProduct
    }
    async updateProduct1({product_id}){
        const objectParams = removeUndefinedObject(this)
        if (objectParams.product_attributes){
            // update child
            await updateProductById({product_id, payload: updateNestedObjectParser(objectParams.product_attributes),  model: electronic})
        }
        const updateProduct = await super.updateProduct(product_id, updateNestedObjectParser(objectParams))
        return updateProduct
    }

    async deleteProduct1({product_id}){
        return {
            product: await super.deleteProduct(product_id),
            model:deleteAttributeProductById({product_id, model: electronic})
        }
    }
}

class Furniture extends Product{
    async createProduct1(){
        const newFurniture = await furniture.create({
            ...this.product_attributes, 
            shop_id: this.shop_id
        })
        if (!newFurniture) throw new BadRequestError('create new Furniture error')
        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) throw new BadRequestError('create new Furniture error')
        return newProduct
    }
    async updateProduct1({product_id}){
        const objectParams = removeUndefinedObject(this)
        if (objectParams.product_attributes){
            // update child
        await updateProductById({product_id, payload: updateNestedObectParser(objectParams.product_attributes),  model: furniture})
        }
        const updateProduct = await super.updateProduct(product_id, updateNestedObjectParser(objectParams))
        return updateProduct
    }

    async deleteProduct1({product_id}){
        return {
            product: await super.deleteProduct(product_id),
            model: deleteAttributeProductById({product_id, model: furniture})
        }
    }
}

ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory;