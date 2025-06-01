import { productsState } from '@/store/products-state';
import type { Products } from '@/types/interfaces';

describe('ProductsState', () => {
  beforeEach(() => {
    productsState.updateProducts([]);
  });

  test('should be an empty products array at initialization', () => {
    expect(productsState.getProducts()).toHaveLength(0);
  });

  test('should update products correctly', () => {
    const mockProducts: Products[] = [
      {
        name: 'Тестовый продукт',
        id: 'test-id',
        description: 'Тестовое описание',
        image: 'test-image.jpg',
        price: 1000,
      },
    ];

    productsState.updateProducts(mockProducts);

    expect(productsState.getProducts()).toHaveLength(1);
    expect(productsState.getProducts()[0]).toEqual(mockProducts[0]);
  });

  test('should notify subscribers on on state change', () => {
    const mockCallback = vi.fn();
    productsState.subscribe(mockCallback);

    productsState.updateProducts([]);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
