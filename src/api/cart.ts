import Alert from '@/components/alert';
import { cartState } from '@/store/cart-state';
import { userState } from '@/store/user-state';
import { AlertStatus, AlertText, ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import type { CartResponse, ErrorResponse } from '@/types/interfaces';
import { TransformApiCartData } from '@/utils/transform-api-cart-data';

export default class APICart {
  public static async createCart(): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}/me${ApiEndpoint.CART}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify({ currency: 'RUB' }),
      }
    )
      .then((response) => response.json())
      .then((body: CartResponse) => {
        if ('errors' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          const cartInfo = {
            id: body.id,
            version: body.version,
            lineItems: TransformApiCartData.transformProductLine(body.lineItems),
          };
          cartState.setCartInfo(cartInfo);
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: AlertText.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: 3000,
        });
      });
  }

  public static async addProductInCart(productId: string): Promise<void> {
    const token = userState.getTokenState();
    const cartInfo = cartState.getCartInfo();

    if (cartInfo) {
      await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}/me${ApiEndpoint.CART}/${cartInfo.id}`,
        {
          method: ApiMethods.POST,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': ContentType.JSON,
          },
          body: JSON.stringify(TransformApiCartData.transformAddProduct({ cartInfo, productId })),
        }
      )
        .then((response) => response.json())
        .then((body: CartResponse | ErrorResponse) => {
          if ('errors' in body) {
            throw new Error(JSON.stringify(body.errors));
          } else {
            const cartInfo = {
              id: body.id,
              version: body.version,
              lineItems: TransformApiCartData.transformProductLine(body.lineItems),
            };
            cartState.setCartInfo(cartInfo);
          }
        })
        .catch((error) => {
          console.error(error);

          Alert.render({
            textContent: AlertText.ERROR_DEFAULT,
            status: AlertStatus.ERROR,
            visibleTime: 3000,
          });
        });
    }
  }

  public static async getCart(): Promise<void> {
    const token = userState.getTokenState();
    const userInfo = userState.getUserInfoState();

    if (userInfo) {
      await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.CART}/customer-id=${userInfo.id}`,
        {
          method: ApiMethods.GET,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((body: CartResponse | ErrorResponse) => {
          if ('statusCode' in body) {
            void APICart.createCart();
          } else {
            const cartInfo = {
              id: body.id,
              version: body.version,
              lineItems: TransformApiCartData.transformProductLine(body.lineItems),
            };
            cartState.setCartInfo(cartInfo);
          }
        })
        .catch((error) => {
          console.error(error);

          Alert.render({
            textContent: AlertText.ERROR_DEFAULT,
            status: AlertStatus.ERROR,
            visibleTime: 3000,
          });
        });
    }
  }
}
