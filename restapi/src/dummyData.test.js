import dummyData from './dummyData';
import Product from './models/product';

const productKeys = [
  'name',
  'price',
  'description',
  'image',
  'serialNumber',
];

jest.mock('./models/product');

describe('descibe dummyData', () => {
  test('not calling create if count is not 0', async () => {
    Product.count.mockImplementationOnce(async () => 100);
    await dummyData();
    expect(Product.create).not.toHaveBeenCalled();
  });
  test('calling create 1000 times with truthy data when count is 0', async () => {
    Product.count.mockImplementationOnce(async () => 0);
    await dummyData();
    expect(Product.create).toBeCalled();
    expect(Product.create).lastCalledWith({
      "description": "evolve customized technologies",
      "image": "http://dummyimage.com/323x316.png/5fa2dd/ffffff",
      "name": "Equate Ranitidine",
      "price": "$7.46",
      "serialNumber": 1000,
    });
  });
});
