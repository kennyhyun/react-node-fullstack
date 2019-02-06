import Product from './product';

const schemaKeys = [
  '_id',
  'name',
  'price',
  'description',
  'image',
  'serialNumber',
];

describe('Product', () => {
  test('has proper schema', () => {
    const keys = Object.keys(Product.schema.paths);
    expect(keys).toEqual(expect.arrayContaining(schemaKeys))
  });
});
