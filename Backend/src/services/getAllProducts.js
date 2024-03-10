const Category = require("../model/category.model");
const Product = require("../model/product.model");

const getAllProducts = async (reqQuery) => {
  let { category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;


  pageSize = pageSize || 10;

  let query = Product.find().populate('category');
  // console.log(category, `'category'`, color, `'color'`, size, `'size'`, minPrice, 'minPrice', maxPrice, 'maxPrice', minDiscount, `'minDiscount'`, sort, `'sort'`, stock, `'stock'`, pageNumber, `'pageNumber'`, pageSize, `'pageSize'`);

  if (category) {
    const existCategory = await Category.findOne({ name: category });

    if (existCategory) {

      query = query.where('category').equals(existCategory._id);

    }
    else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    const colorSet = new Set(color.split(',').map(color => color.trim().toLowerCase()));

    const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join('|'), 'i') : null;

    query = query.where('color').regex(colorRegex);

  }

  if (size) {
    const sizesSet = new Set(size);
    query = query.where('sizes.name').in([...sizesSet]);
  }

  // if (minPrice && maxPrice) {
  //     query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
  // }


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
    if (sort == 'price_low_to_high' || sort == 'price_high_to_low') {

      const sortDirection = sort === 'price_high_to_low' ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });

    }
  }

  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize); //50/10 prod = 5pages

  return { content: products, currentPage: pageNumber, totalPages };

};
