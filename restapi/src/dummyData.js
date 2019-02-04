import Product from './models/product';

export default async function () {
  if ((await Product.count()) > 0) {
    return null;
  }
  console.log('inserting dummy data');
  const data = (await import('./products.json')).default;
  await data.reduce(async (p, d) => {
    await p;
    const {
      id: serialNumber,
      price,
      product_name: name,
      product_image: image,
      description,
    } = d;
    return Product.create({
      serialNumber,
      price,
      name,
      image,
      description,
    });
  }, Promise.resolve());
  console.log(`inserted ${data.length} data.`);
}

