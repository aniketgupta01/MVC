const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  }).then(result => console.log(result))
  .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 Product.create({
  title:title,
  price:price,
  imageUrl:imageUrl,
  description:description

 }).then(() => {
  res.redirect('/');
 })
 .catch(err => console.log(err));
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then( product =>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product:product,
      editing:editMode,
      
    });

  })
  .catch(err => console.log(err))
  
};

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const UpdatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description; 
  Product.findByPk(prodId)
  .then((product) => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = UpdatedImageUrl;
    product.description = updatedDescription;
    return product.save();
    
  })
  .then(result => {console.log("EDITED")
    res.redirect('/admin/products')})
  .catch(err => console.log(err))
  
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err))
};

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product =>{
    return product.destroy();
  })
  .then(result => {
    console.log("DELETED")
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  
}
