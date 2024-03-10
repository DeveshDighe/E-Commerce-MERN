const Category = require("../model/category.model")
const Product = require("../model/product.model")




const createProduct = async (reqData) => {


    let topLavel = await Category.findOne({ name: reqData.topLavelCategory })


    if (!topLavel) {
        topLavel = await new Category({
            name: reqData.topLavelCategory,
            level: 1
        })

        await topLavel.save()

    }

    let secondLavel = await Category.findOne({
        name: reqData.secondLavelCategory,
        parentCategory: topLavel._id,

    })



    if (!secondLavel) {
        secondLavel = await new Category({
            name: reqData.secondLavelCategory,
            parentCategory: topLavel._id,
            level: 2
        })

        await secondLavel.save()
    }


    let thirdLavel = await Category.findOne({
        name: reqData.thirdLavelCategory,
        parentCategory: secondLavel._id
    })



    if (!thirdLavel) {
        thirdLavel = await new Category({
            name: reqData.thirdLavelCategory,
            parentCategory: secondLavel._id,
            level: 3
        })

        await thirdLavel.save()
    }





    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPersent: reqData.discountPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirdLavel._id
    })


    const savedProduct = await product.save();

        
    return savedProduct;


}



const deleteProduct = async (productId) => {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId)

    return 'Product deleted Successfully'
}

const updateProduct = async (productId, reqData) => {
    return await Product.findByIdAndUpdate(productId, reqData)
}



const findProductById = async (id) => {
    try {
        const product = await Product.findById(id)
            .populate('category')
            .populate({ path: 'ratings', populate: { path: 'user' } })
            .populate({ path: 'reviews', populate: { path: 'user' } })
            .exec()

        if (!product) {
            throw new Error(`Product not found with id: ${id}`);
        }

        return product;
    } catch (error) {

        throw error;
    }
};



const getAllProducts = async (reqQuery) => {
    let { category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;


    pageSize = pageSize || 10;

    let query = Product.find().populate('category');
    // console.log(category, `'category'`, color, `'color'`, size, `'size'`, minPrice, 'minPrice', maxPrice, 'maxPrice', minDiscount, `'minDiscount'`, sort, `'sort'`, stock, `'stock'`, pageNumber, `'pageNumber'`, pageSize, `'pageSize'`);

    if (category) {
        const existCategory = await Category.findOne({ name: category })

        if (existCategory) {

            query = query.where('category').equals(existCategory._id)

        }
        else {
            return { content: [], currentPage: 1, totalPages: 0 }
        }
    }

    if (color) {
        const colorSet = new Set(color.split(',').map(color => color.trim().toLowerCase()))

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join('|'), 'i') : null;

        query = query.where('color').regex(colorRegex);

    }

    if (size) {
        const sizesSet = new Set(size);
        query = query.where('sizes.name').in([...sizesSet])
    }

    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }


    if (minDiscount) {
        query = query.where('discountPersent').gt(minDiscount);

    }

    // if (stock) {
    //     if (stock == 'in_stock)') {
    //         query = query.where('quantity').gt(0)
    //     }
    //     else if (stock == 'out_of_stock)') {
    //         query = query.where('quantity').lt(1)
    //     }
    // }

    if (sort) {
        if (sort =='price_low_to_high' || sort =='price_high_to_low') {

        const sortDirection = sort === 'price_high_to_low' ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection })
                    
    }
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 1) * pageSize;


    query = query.skip(skip).limit(pageSize)

 

    

    const products = await query.exec();


    const totalPages = Math.ceil(totalProducts / pageSize) //50/10 prod = 5pages
    
    return { content: products, currentPage: pageNumber, totalPages }

}


const getEveryAllProducts = async () => {
    try {
        const query = Product.find().populate('category');
        const products = await query.exec(); // Execute the query to retrieve products

        return products;
    } catch (error) {
        throw error;
    }
}



const createMultipleProduct = async (products) => {
    const createdProducts = [];
    for (let productData of products) {
        // Create or find categories
        let topCategory = await Category.findOne({ name: productData.topLavelCategory });
        if (!topCategory) {
            topCategory = await new Category({ name: productData.topLavelCategory, level: 1 }).save();
        }

        let secondCategory = await Category.findOne({ name: productData.secondLavelCategory, parentCategory: topCategory._id });
        if (!secondCategory) {
            secondCategory = await new Category({ name: productData.secondLavelCategory, parentCategory: topCategory._id, level: 2 }).save();
        }

        let thirdCategory = await Category.findOne({ name: productData.thirdLavelCategory, parentCategory: secondCategory._id });
        if (!thirdCategory) {
            thirdCategory = await new Category({ name: productData.thirdLavelCategory, parentCategory: secondCategory._id, level: 3 }).save();
        }

        // Create product with categories
        const product = new Product({
            title: productData.title,
            color: productData.color,
            description: productData.description,
            discountedPrice: productData.discountedPrice,
            discountPersent: productData.discountPersent,
            imageUrl: productData.imageUrl,
            brand: productData.brand,
            price: productData.price,
            sizes: productData.size,
            quantity: productData.quantity,
            category: thirdCategory._id
        });

        // Save product and add to createdProducts array
        const savedProduct = await product.save();
        createdProducts.push(savedProduct);
    }
    return createdProducts;
};


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct,
    getEveryAllProducts
}