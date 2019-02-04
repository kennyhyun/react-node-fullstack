import Product from './models/product';

export default async function () {
  if ((await Product.count()) > 0) {
    return null;
  }
  console.log('inserting dummy data');
  const data = (await import('./products.json')).default;
  return Product.create(data.map(({
    price,
    product_name: name,
    product_image: image,
    description,
  }) =>
    ({
      price,
      name,
      image,
      description,
    })
  ));
}

