const allProducts = {
  limit: 20,
  offset: 0,
  count: 4,
  total: 4,
  results: [
    {
      id: '9559f02b-b303-491c-be6f-3d084af55a11',
      version: 96,
      versionModifiedAt: '2025-05-25T19:01:00.583Z',
      lastMessageSequenceNumber: 69,
      createdAt: '2025-05-22T14:56:40.400Z',
      lastModifiedAt: '2025-05-25T19:01:00.583Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      productType: {
        typeId: 'product-type',
        id: 'd412169d-7099-4ce0-9bf2-b7d0c1605da9',
      },
      masterData: {
        current: {
          name: {
            ru: 'Макарон',
          },
          description: {
            ru: 'Макарон (от французского «mасaron») – это печенье из яичных белков, сахара и молотого миндаля, мягкое внутри, суховатое снаружи, с кремом посредине.',
          },
          categories: [
            {
              typeId: 'category',
              id: 'ef9f89cf-1e55-4f4b-8b11-b45795cc41d4',
            },
          ],
          categoryOrderHints: {},
          slug: {
            ru: 'macaron',
          },
          metaTitle: {
            ru: 'Макарон',
          },
          metaDescription: {
            ru: 'Французское пирожное макарон – хрустящее миндальное печенье с нежной кремовой начинкой. Идеально для изысканного десерта, представлено в разных вкусах – попробуйте классику или новые сочетания! Закажите у нас для детей, любимой или в подарок другу. ',
          },
          masterVariant: {
            id: 1,
            sku: 'MAC-SALTED-CARAMEL',
            key: 'macaron-salted-caramel',
            prices: [
              {
                id: 'e666e649-84e9-4ce4-89b3-9e431f082fbc',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 7000,
                  fractionDigits: 2,
                },
                key: 'macaron-caramel-salt',
                country: 'RU',
                discounted: {
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 6650,
                    fractionDigits: 2,
                  },
                  discount: {
                    typeId: 'product-discount',
                    id: '6252fb35-ba0d-430a-9575-656fe8bacfd6',
                  },
                },
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/salt-caramel-macaron-3vXUffu0.png',
                dimensions: {
                  w: 181,
                  h: 180,
                },
              },
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/Leonardo_Phoenix_10_-lTHPavAm.jpg',
                label: 'salt-caramel-set',
                dimensions: {
                  w: 1120,
                  h: 1120,
                },
              },
            ],
            attributes: [
              {
                name: 'flavors',
                value: [
                  {
                    key: 'сaramel',
                    label: 'карамельный',
                  },
                  {
                    key: 'exotic',
                    label: 'экзотический',
                  },
                ],
              },
              {
                name: 'diet',
                value: [
                  {
                    key: 'traditional',
                    label: 'традиционная',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value: "Макарон 'Соленая карамель'",
              },
              {
                name: 'weight',
                value: 30,
              },
              {
                name: 'description',
                value:
                  'Макарон "Соленая карамель" — это утонченное сочетание хрустящей миндальной оболочки и насыщенной карамельной начинки с легкой солоноватой ноткой. Великолепный выбор для утреннего кофе и уютного вечернего чаепития.',
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'MAC-CREAM',
              key: 'macaron-cream-caramel',
              prices: [
                {
                  id: '89d2ba79-334d-4949-95d4-c73c0c327f1b',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 8000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-cream',
                  country: 'RU',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cream-caramel-IbcyZPaj.png',
                  label: 'cream-caramel',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон 'Карамель со сливками'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'MAC-COFFEE',
              key: 'macaron-coffee',
              prices: [
                {
                  id: '9ca0beb4-0304-40a4-aadd-9c4f059d79a7',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-coffee',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/coffee-macaron-ozVAAurF.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/3-coffee-macarons-QiA827Vh.png',
                  dimensions: {
                    w: 181,
                    h: 160,
                  },
                },
              ],
              attributes: [
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: 'Классический кофейный макарон без глютена',
                },
                {
                  name: 'weight',
                  value: 30,
                },
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'coffee',
                      label: 'кофейный',
                    },
                  ],
                },
              ],
              assets: [],
            },
            {
              id: 4,
              sku: 'MAC-BANANA-CHOCOLATE',
              key: 'macaron-banana-chocolate',
              prices: [
                {
                  id: '9acd6c5f-c6d2-4b55-8487-c119bce86b29',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7999,
                    fractionDigits: 2,
                  },
                  key: 'macaron-banana',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/banan-chocolate-maca-N30G429y.png',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'chocolate',
                      label: 'шоколадный',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'lactose-free',
                      label: 'без лактозы',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Бананово-шоколадный макарон 'Сладкий остров'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 5,
              sku: 'MAC-GOOSBERRY',
              key: 'macaron-goosberry',
              prices: [
                {
                  id: '98a2ea70-73a7-4dc3-8660-34f163188a55',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-goosberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/goosberry-Kv4UF80K.png',
                  dimensions: {
                    w: 181,
                    h: 125,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'name',
                  value: "Макарон с крыжовниковой начинкой 'Английское лето'",
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 6,
              sku: 'MAC-BLACKBERRY',
              key: 'macaron-blackberry',
              prices: [
                {
                  id: 'b9969c2b-160d-4fb6-bffe-ee4a55dab39f',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-blackberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/blackberry-macaron-1NOuzNO3.png',
                  dimensions: {
                    w: 181,
                    h: 120,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Миндально-ежевичный макарон 'Миндаль де Мюре'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 7,
              sku: 'MAC-GRAPEFRUIT',
              key: 'macaron-grapefruit',
              prices: [
                {
                  id: '648a85b7-154d-49cf-b673-4a88ec36add0',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 6500,
                    fractionDigits: 2,
                  },
                  key: 'macaron-ginger',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/grapefruit-ginger-_2ut65aK.png',
                  dimensions: {
                    w: 181,
                    h: 172,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/tree-grapefruit-maca-n4ocJqAd.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'spicy',
                      label: 'специи',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'vegan',
                      label: 'веганская',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Макарон с розовым грейпфрутом и имбирем 'Имбирный импульс'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 8,
              sku: 'MAC-PISTACHIO',
              key: 'macaron-pistachio',
              prices: [
                {
                  id: '3004e7f6-a5aa-4989-ac7a-8b3230d0a6b8',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 8000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-pistachio',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/pistachio-macaron-AwTfVmVD.png',
                  dimensions: {
                    w: 181,
                    h: 118,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/pistachio-slice-maca-C5K0dGwN.jpg',
                  dimensions: {
                    w: 181,
                    h: 116,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/4-pistachio-macarons-ujN4z2P9.png',
                  dimensions: {
                    w: 181,
                    h: 259,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'vanilla',
                      label: 'ванильный',
                    },
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                    {
                      key: 'sugar-free',
                      label: 'без сахара',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Фисташково-кремовый макарон 'Летний каприз'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 9,
              sku: 'MAC-CRANBERRY',
              key: 'macaron-cranberry',
              prices: [
                {
                  id: '8e9d02af-6696-413d-972e-597a28c1b68e',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7500,
                    fractionDigits: 2,
                  },
                  key: 'macaron-cranberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cranberry-macaron-j9RQuAL9.png',
                  dimensions: {
                    w: 181,
                    h: 157,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cranberry-sliced-mac-E1k1o1B9.jpg',
                  dimensions: {
                    w: 181,
                    h: 122,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cranberry-macaron-wi-vQ8RLMtr.png',
                  dimensions: {
                    w: 181,
                    h: 119,
                  },
                },
              ],
              attributes: [
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Клюквенно-карамельный макарон 'День печати'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 10,
              sku: 'MAC-STRAWBERRY',
              key: 'macaron-strawberry',
              prices: [
                {
                  id: '5b11ab93-2fc6-4065-918b-83093c230211',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-strawberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/strawberry-macaron-zyRwO7IT.png',
                  dimensions: {
                    w: 181,
                    h: 146,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/strawberry-sliced-ma-z8NGbs9H.jpg',
                  dimensions: {
                    w: 181,
                    h: 226,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'sugar-free',
                      label: 'без сахара',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Классический макарон 'Клубника со сливками'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 11,
              sku: 'MAC-CANDY',
              key: 'macaron-candy',
              prices: [
                {
                  id: '4040b9a9-3691-4326-9a67-9ae812fa645c',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 9900,
                    fractionDigits: 2,
                  },
                  key: 'macaron-candy',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/candy-macaroon-x9fqLZfo.png',
                  dimensions: {
                    w: 181,
                    h: 326,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'sugar-free',
                      label: 'без сахара',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон для следящих за своей фигурой 'Сладкий обманщик'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 12,
              sku: 'MAC-COCONUT',
              key: 'macaron-coconut',
              prices: [
                {
                  id: '3b138b72-6d2d-454f-959b-56d346ec350b',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-coconut',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/coconut-cheese-macar-QjZdw_94.png',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Макарон с экзотическим сочетанием кокоса и молочного сыра 'Баунти'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 13,
              sku: 'MAC-MANGO',
              key: 'macaron-mango',
              prices: [
                {
                  id: '122d413e-c49b-4404-b671-1a5b27da9ee8',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-mango',
                },
                {
                  id: '453b0262-1627-4179-9f93-bd8af236a3bf',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-discout-mango',
                  validFrom: '2025-04-30T21:00:00.000Z',
                  validUntil: '2025-07-29T21:00:00.000Z',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/mango-cacao-macaron-9flzH3zE.png',
                  dimensions: {
                    w: 181,
                    h: 97,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'chocolate',
                      label: 'шоколадный',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'vegan',
                      label: 'веганская',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон со вкусом манго и какао 'Экзотический сюрприз'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 14,
              sku: 'MAC-PASSION',
              key: 'macaron-passion',
              prices: [
                {
                  id: '5d208623-1b2f-4142-8e4b-76ae8515338a',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-passion',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/passion-macaron-l6yMLOeX.png',
                  dimensions: {
                    w: 181,
                    h: 153,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'vegan',
                      label: 'веганская',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Макарон с маракуйей 'Тропический престиж'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 15,
              sku: 'MAC-PEACH',
              key: 'macaron-peach',
              prices: [
                {
                  id: 'e7693644-d75e-4c8b-80ad-2686a2376d3d',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-peach',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/peach-macaron-ukVt1Q8H.png',
                  dimensions: {
                    w: 181,
                    h: 131,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'lactose-free',
                      label: 'без лактозы',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон фруктовый 'Сочный персик'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 16,
              sku: 'MAC-CHILI',
              key: 'macaron-chili',
              prices: [
                {
                  id: 'acad9f81-fd6c-45d0-ba96-2d2ab8c0d165',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-chili',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/pesto-macaron-MiPKeHMX.png',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'spicy',
                      label: 'специи',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон с перчиком чили 'Острое ощущение'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 17,
              sku: 'MAC_VANULLA',
              key: 'macaron-vanilla',
              prices: [
                {
                  id: 'd5098793-a6ec-42a3-bb0c-c462be360a91',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-vanilla',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/vanilla-macaron-3CEeSyNZ.png',
                  dimensions: {
                    w: 181,
                    h: 138,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/vanilla-tea-with-mak-sfvKy8ZH.jpg',
                  dimensions: {
                    w: 181,
                    h: 272,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'vanilla',
                      label: 'ванильный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Классический ванильный макарон 'Белая орхидея'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 18,
              sku: 'MAC-WALNUT',
              key: 'macaron-walnut',
              prices: [
                {
                  id: '53f09ed5-5689-4cdf-a0d8-2037ca7130bb',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-walnut',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/walnut-raspberry-mac-Cy47YEYp.png',
                  dimensions: {
                    w: 180,
                    h: 144,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон со вкусом грецких орехов и малины 'Гармония'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        staged: {
          name: {
            ru: 'Макарон',
          },
          description: {
            ru: 'Макарон (от французского «mасaron») – это печенье из яичных белков, сахара и молотого миндаля, мягкое внутри, суховатое снаружи, с кремом посредине.',
          },
          categories: [
            {
              typeId: 'category',
              id: 'ef9f89cf-1e55-4f4b-8b11-b45795cc41d4',
            },
          ],
          categoryOrderHints: {},
          slug: {
            ru: 'macaron',
          },
          metaTitle: {
            ru: 'Макарон',
          },
          metaDescription: {
            ru: 'Французское пирожное макарон – хрустящее миндальное печенье с нежной кремовой начинкой. Идеально для изысканного десерта, представлено в разных вкусах – попробуйте классику или новые сочетания! Закажите у нас для детей, любимой или в подарок другу. ',
          },
          masterVariant: {
            id: 1,
            sku: 'MAC-SALTED-CARAMEL',
            key: 'macaron-salted-caramel',
            prices: [
              {
                id: 'e666e649-84e9-4ce4-89b3-9e431f082fbc',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 7000,
                  fractionDigits: 2,
                },
                key: 'macaron-caramel-salt',
                country: 'RU',
                discounted: {
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 6650,
                    fractionDigits: 2,
                  },
                  discount: {
                    typeId: 'product-discount',
                    id: '6252fb35-ba0d-430a-9575-656fe8bacfd6',
                  },
                },
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/salt-caramel-macaron-3vXUffu0.png',
                dimensions: {
                  w: 181,
                  h: 180,
                },
              },
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/Leonardo_Phoenix_10_-lTHPavAm.jpg',
                label: 'salt-caramel-set',
                dimensions: {
                  w: 1120,
                  h: 1120,
                },
              },
            ],
            attributes: [
              {
                name: 'flavors',
                value: [
                  {
                    key: 'сaramel',
                    label: 'карамельный',
                  },
                  {
                    key: 'exotic',
                    label: 'экзотический',
                  },
                ],
              },
              {
                name: 'diet',
                value: [
                  {
                    key: 'traditional',
                    label: 'традиционная',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value: "Макарон 'Соленая карамель'",
              },
              {
                name: 'weight',
                value: 30,
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'MAC-CREAM',
              key: 'macaron-cream-caramel',
              prices: [
                {
                  id: '89d2ba79-334d-4949-95d4-c73c0c327f1b',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 8000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-cream',
                  country: 'RU',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cream-caramel-IbcyZPaj.png',
                  label: 'cream-caramel',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон 'Карамель со сливками'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'MAC-COFFEE',
              key: 'macaron-coffee',
              prices: [
                {
                  id: '9ca0beb4-0304-40a4-aadd-9c4f059d79a7',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-coffee',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/coffee-macaron-ozVAAurF.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/3-coffee-macarons-QiA827Vh.png',
                  dimensions: {
                    w: 181,
                    h: 160,
                  },
                },
              ],
              attributes: [
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: 'Классический кофейный макарон без глютена',
                },
                {
                  name: 'weight',
                  value: 30,
                },
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'coffee',
                      label: 'кофейный',
                    },
                  ],
                },
              ],
              assets: [],
            },
            {
              id: 4,
              sku: 'MAC-BANANA-CHOCOLATE',
              key: 'macaron-banana-chocolate',
              prices: [
                {
                  id: '9acd6c5f-c6d2-4b55-8487-c119bce86b29',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7999,
                    fractionDigits: 2,
                  },
                  key: 'macaron-banana',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/banan-chocolate-maca-N30G429y.png',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'chocolate',
                      label: 'шоколадный',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'lactose-free',
                      label: 'без лактозы',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Бананово-шоколадный макарон 'Сладкий остров'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 5,
              sku: 'MAC-GOOSBERRY',
              key: 'macaron-goosberry',
              prices: [
                {
                  id: '98a2ea70-73a7-4dc3-8660-34f163188a55',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-goosberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/goosberry-Kv4UF80K.png',
                  dimensions: {
                    w: 181,
                    h: 125,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'name',
                  value: "Макарон с крыжовниковой начинкой 'Английское лето'",
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 6,
              sku: 'MAC-BLACKBERRY',
              key: 'macaron-blackberry',
              prices: [
                {
                  id: 'b9969c2b-160d-4fb6-bffe-ee4a55dab39f',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-blackberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/blackberry-macaron-1NOuzNO3.png',
                  dimensions: {
                    w: 181,
                    h: 120,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Миндально-ежевичный макарон 'Миндаль де Мюре'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 7,
              sku: 'MAC-GRAPEFRUIT',
              key: 'macaron-grapefruit',
              prices: [
                {
                  id: '648a85b7-154d-49cf-b673-4a88ec36add0',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 6500,
                    fractionDigits: 2,
                  },
                  key: 'macaron-ginger',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/grapefruit-ginger-_2ut65aK.png',
                  dimensions: {
                    w: 181,
                    h: 172,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/tree-grapefruit-maca-n4ocJqAd.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'spicy',
                      label: 'специи',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'vegan',
                      label: 'веганская',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Макарон с розовым грейпфрутом и имбирем 'Имбирный импульс'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 8,
              sku: 'MAC-PISTACHIO',
              key: 'macaron-pistachio',
              prices: [
                {
                  id: '3004e7f6-a5aa-4989-ac7a-8b3230d0a6b8',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 8000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-pistachio',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/pistachio-macaron-AwTfVmVD.png',
                  dimensions: {
                    w: 181,
                    h: 118,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/pistachio-slice-maca-C5K0dGwN.jpg',
                  dimensions: {
                    w: 181,
                    h: 116,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/4-pistachio-macarons-ujN4z2P9.png',
                  dimensions: {
                    w: 181,
                    h: 259,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'vanilla',
                      label: 'ванильный',
                    },
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                    {
                      key: 'sugar-free',
                      label: 'без сахара',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Фисташково-кремовый макарон 'Летний каприз'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 9,
              sku: 'MAC-CRANBERRY',
              key: 'macaron-cranberry',
              prices: [
                {
                  id: '8e9d02af-6696-413d-972e-597a28c1b68e',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7500,
                    fractionDigits: 2,
                  },
                  key: 'macaron-cranberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cranberry-macaron-j9RQuAL9.png',
                  dimensions: {
                    w: 181,
                    h: 157,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cranberry-sliced-mac-E1k1o1B9.jpg',
                  dimensions: {
                    w: 181,
                    h: 122,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cranberry-macaron-wi-vQ8RLMtr.png',
                  dimensions: {
                    w: 181,
                    h: 119,
                  },
                },
              ],
              attributes: [
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Клюквенно-карамельный макарон 'День печати'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 10,
              sku: 'MAC-STRAWBERRY',
              key: 'macaron-strawberry',
              prices: [
                {
                  id: '5b11ab93-2fc6-4065-918b-83093c230211',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-strawberry',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/strawberry-macaron-zyRwO7IT.png',
                  dimensions: {
                    w: 181,
                    h: 146,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/strawberry-sliced-ma-z8NGbs9H.jpg',
                  dimensions: {
                    w: 181,
                    h: 226,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'sugar-free',
                      label: 'без сахара',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Классический макарон 'Клубника со сливками'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 11,
              sku: 'MAC-CANDY',
              key: 'macaron-candy',
              prices: [
                {
                  id: '4040b9a9-3691-4326-9a67-9ae812fa645c',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 9900,
                    fractionDigits: 2,
                  },
                  key: 'macaron-candy',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/candy-macaroon-x9fqLZfo.png',
                  dimensions: {
                    w: 181,
                    h: 326,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'sugar-free',
                      label: 'без сахара',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон для следящих за своей фигурой 'Сладкий обманщик'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 12,
              sku: 'MAC-COCONUT',
              key: 'macaron-coconut',
              prices: [
                {
                  id: '3b138b72-6d2d-454f-959b-56d346ec350b',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-coconut',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/coconut-cheese-macar-QjZdw_94.png',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Макарон с экзотическим сочетанием кокоса и молочного сыра 'Баунти'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 13,
              sku: 'MAC-MANGO',
              key: 'macaron-mango',
              prices: [
                {
                  id: '122d413e-c49b-4404-b671-1a5b27da9ee8',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-mango',
                },
                {
                  id: '453b0262-1627-4179-9f93-bd8af236a3bf',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-discout-mango',
                  validFrom: '2025-04-30T21:00:00.000Z',
                  validUntil: '2025-07-29T21:00:00.000Z',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/mango-cacao-macaron-9flzH3zE.png',
                  dimensions: {
                    w: 181,
                    h: 97,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'chocolate',
                      label: 'шоколадный',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'vegan',
                      label: 'веганская',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон со вкусом манго и какао 'Экзотический сюрприз'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 14,
              sku: 'MAC-PASSION',
              key: 'macaron-passion',
              prices: [
                {
                  id: '5d208623-1b2f-4142-8e4b-76ae8515338a',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-passion',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/passion-macaron-l6yMLOeX.png',
                  dimensions: {
                    w: 181,
                    h: 153,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'vegan',
                      label: 'веганская',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Макарон с маракуйей 'Тропический престиж'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
            {
              id: 15,
              sku: 'MAC-PEACH',
              key: 'macaron-peach',
              prices: [
                {
                  id: 'e7693644-d75e-4c8b-80ad-2686a2376d3d',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-peach',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/peach-macaron-ukVt1Q8H.png',
                  dimensions: {
                    w: 181,
                    h: 131,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                    {
                      key: 'fruity',
                      label: 'фруктовый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'lactose-free',
                      label: 'без лактозы',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон фруктовый 'Сочный персик'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 16,
              sku: 'MAC-CHILI',
              key: 'macaron-chili',
              prices: [
                {
                  id: 'acad9f81-fd6c-45d0-ba96-2d2ab8c0d165',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-chili',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/pesto-macaron-MiPKeHMX.png',
                  dimensions: {
                    w: 181,
                    h: 170,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'exotic',
                      label: 'экзотический',
                    },
                    {
                      key: 'spicy',
                      label: 'специи',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон с перчиком чили 'Острое ощущение'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 17,
              sku: 'MAC_VANULLA',
              key: 'macaron-vanilla',
              prices: [
                {
                  id: 'd5098793-a6ec-42a3-bb0c-c462be360a91',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 5000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-vanilla',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/vanilla-macaron-3CEeSyNZ.png',
                  dimensions: {
                    w: 181,
                    h: 138,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/vanilla-tea-with-mak-sfvKy8ZH.jpg',
                  dimensions: {
                    w: 181,
                    h: 272,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                    {
                      key: 'vanilla',
                      label: 'ванильный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Классический ванильный макарон 'Белая орхидея'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
              ],
              assets: [],
            },
            {
              id: 18,
              sku: 'MAC-WALNUT',
              key: 'macaron-walnut',
              prices: [
                {
                  id: '53f09ed5-5689-4cdf-a0d8-2037ca7130bb',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'macaron-walnut',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/walnut-raspberry-mac-Cy47YEYp.png',
                  dimensions: {
                    w: 180,
                    h: 144,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                    {
                      key: 'nutty',
                      label: 'ореховый',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Макарон со вкусом грецких орехов и малины 'Гармония'",
                },
                {
                  name: 'weight',
                  value: 50,
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        published: true,
        hasStagedChanges: false,
      },
      key: 'macaron',
      priceMode: 'Embedded',
      lastVariantId: 18,
    },
    {
      id: 'bada0c5a-91c2-4843-bfbf-9af2fa978886',
      version: 20,
      versionModifiedAt: '2025-05-25T19:01:23.608Z',
      lastMessageSequenceNumber: 15,
      createdAt: '2025-05-25T17:09:34.109Z',
      lastModifiedAt: '2025-05-25T19:01:23.608Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      productType: {
        typeId: 'product-type',
        id: 'd412169d-7099-4ce0-9bf2-b7d0c1605da9',
      },
      masterData: {
        current: {
          name: {
            ru: 'Профитроли',
          },
          description: {
            ru: 'Профитро́ли(фр. profiterole) — небольшие кулинарные изделия французской кухни из заварного теста с различными начинками (как сладкими, так и солеными)',
          },
          categories: [],
          categoryOrderHints: {},
          slug: {
            ru: 'profiterole',
          },
          metaTitle: {
            ru: 'Классические профитроли – сладкие и солёные варианты',
          },
          metaDescription: {
            ru: 'Хрустящее тесто и нежная начинка – попробуйте профитроли с карамелью, шоколадом, рыбой, грибами или сыром!',
          },
          masterVariant: {
            id: 1,
            sku: 'PRO-COTTAGE-CREAM',
            key: 'profitrole-cottage-cream',
            prices: [
              {
                id: '3a106885-abf7-42a8-a9ff-53555678819f',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 9000,
                  fractionDigits: 2,
                },
                key: 'profitrole-cottage-cream',
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cottage-cheese-cream-3oCEuNJl.png',
                dimensions: {
                  w: 181,
                  h: 119,
                },
              },
            ],
            attributes: [
              {
                name: 'flavors',
                value: [
                  {
                    key: 'milky',
                    label: 'молочный',
                  },
                ],
              },
              {
                name: 'diet',
                value: [
                  {
                    key: 'traditional',
                    label: 'традиционная',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value: "Профитроль с творожной начинкой 'Юмбрик'",
              },
              {
                name: 'weight',
                value: 10,
              },
              {
                name: 'filling',
                value: [
                  {
                    key: 'cottage-cheese',
                    label: 'творожный',
                  },
                ],
              },
              {
                name: 'description',
                value: {
                  ru: 'Хрустящее заварное тесто скрывает внутри нежную творожную начинку с лёгкой сладостью и воздушной текстурой. Идеален для утреннего кофе, уютного вечера и особенных моментов.',
                },
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'PRO-CAVIAR',
              key: 'profitrole-caviar',
              prices: [
                {
                  id: 'fc53a1ff-d222-4b23-8cac-3e4d0111f3c2',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 24_000,
                    fractionDigits: 2,
                  },
                  key: 'profitrole-caviar',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/caviar-profiterole-X6j8PKEl.png',
                  dimensions: {
                    w: 181,
                    h: 250,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'fish',
                      label: 'рыбный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Профитроль с икрой 'Царское угощение'",
                },
                {
                  name: 'weight',
                  value: 10,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'caviar',
                      label: 'с икрой',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Изысканное сочетание нежного теста и солоноватой икры создаёт настоящий праздник вкуса. Эти профитроли станут украшением любого стола и подарят вам незабываемые гастрономические впечатления.',
                  },
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'PRO-EMPTY',
              key: 'profitrole-without-filling',
              prices: [
                {
                  id: 'b22312e6-8f2f-4658-96a5-e5d93cfee7e4',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 3000,
                    fractionDigits: 2,
                  },
                  key: 'profiterole-empty',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/no-filling-profitero-M3Vpl-dJ.png',
                  dimensions: {
                    w: 181,
                    h: 109,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/no-filling-profitero-6K8PT3SJ.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/no-filling-slised-pr-9dxCfEPd.png',
                  dimensions: {
                    w: 181,
                    h: 139,
                  },
                },
              ],
              attributes: [
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: 'Профитроль без начинки',
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Эти универсальные классические профитроли могут быть поданы как добавка к первым блюдам, самостоятельное лакомство или стать основой для создания собственных кулинарных шедевров.',
                  },
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'no-filling',
                      label: 'без наполнителя',
                    },
                  ],
                },
                {
                  name: 'weight',
                  value: 10,
                },
              ],
              assets: [],
            },
            {
              id: 4,
              sku: 'PRO-HERRING',
              key: 'profitrole-herring',
              prices: [
                {
                  id: 'bdb7ee38-bc80-44f8-9bed-2a035dae9908',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 10_000,
                    fractionDigits: 2,
                  },
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/herring%20profiterole-akgLFtWH.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'fish',
                      label: 'рыбный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Профитроль с начинкой из сельди 'Привет из Амстердама'",
                },
                {
                  name: 'weight',
                  value: 15,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'herring ',
                      label: 'с сельдью',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Оригинальная закуска, где воздушное тесто гармонично сочетается с пикантной сельдью. Идеальный выбор для тех, кто ценит необычные вкусовые сочетания и хочет удивить своих гостей.',
                  },
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        staged: {
          name: {
            ru: 'Профитроли',
          },
          description: {
            ru: 'Профитро́ли(фр. profiterole) — небольшие кулинарные изделия французской кухни из заварного теста с различными начинками (как сладкими, так и солеными)',
          },
          categories: [],
          categoryOrderHints: {},
          slug: {
            ru: 'profiterole',
          },
          metaTitle: {
            ru: 'Классические профитроли – сладкие и солёные варианты',
          },
          metaDescription: {
            ru: 'Хрустящее тесто и нежная начинка – попробуйте профитроли с карамелью, шоколадом, рыбой, грибами или сыром!',
          },
          masterVariant: {
            id: 1,
            sku: 'PRO-COTTAGE-CREAM',
            key: 'profitrole-cottage-cream',
            prices: [
              {
                id: '3a106885-abf7-42a8-a9ff-53555678819f',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 9000,
                  fractionDigits: 2,
                },
                key: 'profitrole-cottage-cream',
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cottage-cheese-cream-3oCEuNJl.png',
                dimensions: {
                  w: 181,
                  h: 119,
                },
              },
            ],
            attributes: [
              {
                name: 'flavors',
                value: [
                  {
                    key: 'milky',
                    label: 'молочный',
                  },
                ],
              },
              {
                name: 'diet',
                value: [
                  {
                    key: 'traditional',
                    label: 'традиционная',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value: "Профитроль с творожной начинкой 'Юмбрик'",
              },
              {
                name: 'weight',
                value: 10,
              },
              {
                name: 'filling',
                value: [
                  {
                    key: 'cottage-cheese',
                    label: 'творожный',
                  },
                ],
              },
              {
                name: 'description',
                value: {
                  ru: 'Хрустящее заварное тесто скрывает внутри нежную творожную начинку с лёгкой сладостью и воздушной текстурой. Идеален для утреннего кофе, уютного вечера и особенных моментов.',
                },
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'PRO-CAVIAR',
              key: 'profitrole-caviar',
              prices: [
                {
                  id: 'fc53a1ff-d222-4b23-8cac-3e4d0111f3c2',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 24_000,
                    fractionDigits: 2,
                  },
                  key: 'profitrole-caviar',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/caviar-profiterole-X6j8PKEl.png',
                  dimensions: {
                    w: 181,
                    h: 250,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'fish',
                      label: 'рыбный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Профитроль с икрой 'Царское угощение'",
                },
                {
                  name: 'weight',
                  value: 10,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'caviar',
                      label: 'с икрой',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Изысканное сочетание нежного теста и солоноватой икры создаёт настоящий праздник вкуса. Эти профитроли станут украшением любого стола и подарят вам незабываемые гастрономические впечатления.',
                  },
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'PRO-EMPTY',
              key: 'profitrole-without-filling',
              prices: [
                {
                  id: 'b22312e6-8f2f-4658-96a5-e5d93cfee7e4',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 3000,
                    fractionDigits: 2,
                  },
                  key: 'profiterole-empty',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/no-filling-profitero-M3Vpl-dJ.png',
                  dimensions: {
                    w: 181,
                    h: 109,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/no-filling-profitero-6K8PT3SJ.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/no-filling-slised-pr-9dxCfEPd.png',
                  dimensions: {
                    w: 181,
                    h: 139,
                  },
                },
              ],
              attributes: [
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: 'Профитроль без начинки',
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Эти универсальные классические профитроли могут быть поданы как добавка к первым блюдам, самостоятельное лакомство или стать основой для создания собственных кулинарных шедевров.',
                  },
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'no-filling',
                      label: 'без наполнителя',
                    },
                  ],
                },
                {
                  name: 'weight',
                  value: 10,
                },
              ],
              assets: [],
            },
            {
              id: 4,
              sku: 'PRO-HERRING',
              key: 'profitrole-herring',
              prices: [
                {
                  id: 'bdb7ee38-bc80-44f8-9bed-2a035dae9908',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 10_000,
                    fractionDigits: 2,
                  },
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/herring%20profiterole-akgLFtWH.png',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'fish',
                      label: 'рыбный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Профитроль с начинкой из сельди 'Привет из Амстердама'",
                },
                {
                  name: 'weight',
                  value: 15,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'herring ',
                      label: 'с сельдью',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Оригинальная закуска, где воздушное тесто гармонично сочетается с пикантной сельдью. Идеальный выбор для тех, кто ценит необычные вкусовые сочетания и хочет удивить своих гостей.',
                  },
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        published: true,
        hasStagedChanges: false,
      },
      key: 'profiterole',
      priceMode: 'Embedded',
      lastVariantId: 4,
    },
    {
      id: '580e33c2-445f-4003-a6fb-0c73f65a0ba5',
      version: 22,
      versionModifiedAt: '2025-05-25T19:01:15.721Z',
      lastMessageSequenceNumber: 14,
      createdAt: '2025-05-25T17:50:58.301Z',
      lastModifiedAt: '2025-05-25T19:01:15.721Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      productType: {
        typeId: 'product-type',
        id: 'd412169d-7099-4ce0-9bf2-b7d0c1605da9',
      },
      masterData: {
        current: {
          name: {
            ru: 'Эклеры',
          },
          description: {
            ru: 'Эклер - это нежный десерт небольшого размера. Сверху он покрыт сладкой глазурью или шоколадом, а внутри под тонким слоем заварного теста находится крем.',
          },
          categories: [
            {
              typeId: 'category',
              id: 'ef9f89cf-1e55-4f4b-8b11-b45795cc41d4',
            },
          ],
          categoryOrderHints: {},
          slug: {
            ru: 'eclair',
          },
          metaTitle: {
            ru: 'Эклеры — французская классика вкуса и утончённости.',
          },
          metaDescription: {
            ru: 'Откройте для себя эклеры — нежное заварное тесто, воздушные кремы и разнообразие глазурей. Идеальное лакомство для любого праздника, отличный подарок любимому человеку.',
          },
          masterVariant: {
            id: 1,
            sku: 'ECL-CHOKOLATE',
            key: 'eclair-chocolate',
            prices: [
              {
                id: 'a74b4381-6219-4afa-981b-152620fef2e3',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 59_900,
                  fractionDigits: 2,
                },
                key: 'eclair-chocolate',
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/chocolate-eclair-CgqzbJah.png',
                dimensions: {
                  w: 181,
                  h: 90,
                },
              },
            ],
            attributes: [
              {
                name: 'flavors',
                value: [
                  {
                    key: 'milky',
                    label: 'молочный',
                  },
                  {
                    key: 'chocolate',
                    label: 'шоколадный',
                  },
                ],
              },
              {
                name: 'diet',
                value: [
                  {
                    key: 'traditional',
                    label: 'традиционная',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value:
                  "Классический эклер с заварным кремом и шоколадной глазурью 'Шоколадный шик'",
              },
              {
                name: 'weight',
                value: 60,
              },
              {
                name: 'filling',
                value: [
                  {
                    key: 'custard',
                    label: 'заварной крем',
                  },
                ],
              },
              {
                name: 'toping',
                value: [
                  {
                    key: 'chocolate',
                    label: 'шоколадный топинг',
                  },
                ],
              },
              {
                name: 'description',
                value: {
                  ru: "'Шоколадный шик' — гармония вкуса и текстуры. Нежное заварное тесто, наполненное кремом и покрытое шоколадной глазурью, остаётся любимым лакомством для всех поколений.",
                },
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'ECL-PRESENT',
              key: 'eclair-present',
              prices: [
                {
                  id: 'edd75309-6d64-48c7-bd20-c3ea0f8ab7f2',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 100_000,
                    fractionDigits: 2,
                  },
                  key: 'eclair-present',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/raspberry-eclair-s-FeOyBKAP.png',
                  dimensions: {
                    w: 181,
                    h: 106,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/present-eclair-zMkbgWli.png',
                  dimensions: {
                    w: 181,
                    h: 136,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/berries-eclairs-TQw2m68N.jpg',
                  dimensions: {
                    w: 181,
                    h: 130,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/flowers-and-berries--ckMiddG4.jpg',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'vanilla',
                      label: 'ванильный',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Эклер 'Подарочный'",
                },
                {
                  name: 'weight',
                  value: 60,
                },
                {
                  name: 'toping',
                  value: [
                    {
                      key: 'nut-crumble',
                      label: 'ореховая крошка',
                    },
                    {
                      key: 'icing',
                      label: 'сахарная помадка',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: "Если вы ищете идею для подарка, эклер 'Подарочный' станет отличным выбором. Нежное заварное тесто, наполненное воздушным кремом и украшенное особым декором, подчеркнёт вашу заботу и внимание. Возможно дополнение в виде свежих ягод и взбитый сливок. Цена может уточняться в зависимости от использованных ингредиентов. ",
                  },
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'ECL-MILK',
              key: 'eclair-milk',
              prices: [
                {
                  id: 'd9374c60-c5a7-4e25-82f7-57060f9b3ec0',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 50_000,
                    fractionDigits: 2,
                  },
                  key: 'eclair-milk',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/milk-eclair-IBvI5FkT.png',
                  dimensions: {
                    w: 181,
                    h: 121,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/milk-slised-eclair-OPPbmtYa.png',
                  dimensions: {
                    w: 181,
                    h: 121,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Эклер со сгущенным молоком 'Коровка'",
                },
                {
                  name: 'weight',
                  value: 60,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'condensed-milk',
                      label: 'сгущенка',
                    },
                  ],
                },
                {
                  name: 'toping',
                  value: [
                    {
                      key: 'icing',
                      label: 'сахарная помадка',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Этот эклер — воплощение уюта и детских воспоминаний. Нежное заварное тесто, наполненное густым сгущённым молоком, создаёт гармонию сладости и мягкости. Такое родное лакомство, которое всегда дарит тепло! Есть варианты с карамельной глазурью или без топпинга.',
                  },
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        staged: {
          name: {
            ru: 'Эклеры',
          },
          description: {
            ru: 'Эклер - это нежный десерт небольшого размера. Сверху он покрыт сладкой глазурью или шоколадом, а внутри под тонким слоем заварного теста находится крем.',
          },
          categories: [
            {
              typeId: 'category',
              id: 'ef9f89cf-1e55-4f4b-8b11-b45795cc41d4',
            },
          ],
          categoryOrderHints: {},
          slug: {
            ru: 'eclair',
          },
          metaTitle: {
            ru: 'Эклеры — французская классика вкуса и утончённости.',
          },
          metaDescription: {
            ru: 'Откройте для себя эклеры — нежное заварное тесто, воздушные кремы и разнообразие глазурей. Идеальное лакомство для любого праздника, отличный подарок любимому человеку.',
          },
          masterVariant: {
            id: 1,
            sku: 'ECL-CHOKOLATE',
            key: 'eclair-chocolate',
            prices: [
              {
                id: 'a74b4381-6219-4afa-981b-152620fef2e3',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 59_900,
                  fractionDigits: 2,
                },
                key: 'eclair-chocolate',
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/chocolate-eclair-CgqzbJah.png',
                dimensions: {
                  w: 181,
                  h: 90,
                },
              },
            ],
            attributes: [
              {
                name: 'flavors',
                value: [
                  {
                    key: 'milky',
                    label: 'молочный',
                  },
                  {
                    key: 'chocolate',
                    label: 'шоколадный',
                  },
                ],
              },
              {
                name: 'diet',
                value: [
                  {
                    key: 'traditional',
                    label: 'традиционная',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value:
                  "Классический эклер с заварным кремом и шоколадной глазурью 'Шоколадный шик'",
              },
              {
                name: 'weight',
                value: 60,
              },
              {
                name: 'filling',
                value: [
                  {
                    key: 'custard',
                    label: 'заварной крем',
                  },
                ],
              },
              {
                name: 'toping',
                value: [
                  {
                    key: 'chocolate',
                    label: 'шоколадный топинг',
                  },
                ],
              },
              {
                name: 'description',
                value: {
                  ru: "'Шоколадный шик' — гармония вкуса и текстуры. Нежное заварное тесто, наполненное кремом и покрытое шоколадной глазурью, остаётся любимым лакомством для всех поколений.",
                },
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'ECL-PRESENT',
              key: 'eclair-present',
              prices: [
                {
                  id: 'edd75309-6d64-48c7-bd20-c3ea0f8ab7f2',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 100_000,
                    fractionDigits: 2,
                  },
                  key: 'eclair-present',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/raspberry-eclair-s-FeOyBKAP.png',
                  dimensions: {
                    w: 181,
                    h: 106,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/present-eclair-zMkbgWli.png',
                  dimensions: {
                    w: 181,
                    h: 136,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/berries-eclairs-TQw2m68N.jpg',
                  dimensions: {
                    w: 181,
                    h: 130,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/flowers-and-berries--ckMiddG4.jpg',
                  dimensions: {
                    w: 181,
                    h: 181,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'vanilla',
                      label: 'ванильный',
                    },
                    {
                      key: 'berry',
                      label: 'ягодный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Эклер 'Подарочный'",
                },
                {
                  name: 'weight',
                  value: 60,
                },
                {
                  name: 'toping',
                  value: [
                    {
                      key: 'nut-crumble',
                      label: 'ореховая крошка',
                    },
                    {
                      key: 'icing',
                      label: 'сахарная помадка',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: "Если вы ищете идею для подарка, эклер 'Подарочный' станет отличным выбором. Нежное заварное тесто, наполненное воздушным кремом и украшенное особым декором, подчеркнёт вашу заботу и внимание. Возможно дополнение в виде свежих ягод и взбитый сливок. Цена может уточняться в зависимости от использованных ингредиентов. ",
                  },
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'ECL-MILK',
              key: 'eclair-milk',
              prices: [
                {
                  id: 'd9374c60-c5a7-4e25-82f7-57060f9b3ec0',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 50_000,
                    fractionDigits: 2,
                  },
                  key: 'eclair-milk',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/milk-eclair-IBvI5FkT.png',
                  dimensions: {
                    w: 181,
                    h: 121,
                  },
                },
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/milk-slised-eclair-OPPbmtYa.png',
                  dimensions: {
                    w: 181,
                    h: 121,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'сaramel',
                      label: 'карамельный',
                    },
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Эклер со сгущенным молоком 'Коровка'",
                },
                {
                  name: 'weight',
                  value: 60,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'condensed-milk',
                      label: 'сгущенка',
                    },
                  ],
                },
                {
                  name: 'toping',
                  value: [
                    {
                      key: 'icing',
                      label: 'сахарная помадка',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Этот эклер — воплощение уюта и детских воспоминаний. Нежное заварное тесто, наполненное густым сгущённым молоком, создаёт гармонию сладости и мягкости. Такое родное лакомство, которое всегда дарит тепло! Есть варианты с карамельной глазурью или без топпинга.',
                  },
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        published: true,
        hasStagedChanges: false,
      },
      key: 'eclair',
      priceMode: 'Embedded',
      lastVariantId: 3,
    },
    {
      id: 'c56d49a7-c767-48cc-8d9c-fd52e1362e79',
      version: 13,
      versionModifiedAt: '2025-05-25T19:01:09.671Z',
      lastMessageSequenceNumber: 10,
      createdAt: '2025-05-25T18:44:40.235Z',
      lastModifiedAt: '2025-05-25T19:01:09.671Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: 'a2548023-e53b-45bf-a8ca-1fad99fc857f',
        },
      },
      productType: {
        typeId: 'product-type',
        id: 'd412169d-7099-4ce0-9bf2-b7d0c1605da9',
      },
      masterData: {
        current: {
          name: {
            ru: 'Трубочки',
          },
          description: {
            ru: 'Вафельные трубочки могут быть с наполнением или без начинки',
          },
          categories: [
            {
              typeId: 'category',
              id: 'ef9f89cf-1e55-4f4b-8b11-b45795cc41d4',
            },
          ],
          categoryOrderHints: {},
          slug: {
            ru: 'rolls',
          },
          metaTitle: {
            ru: 'Вафельные трубочки — хрустящее лакомство для любого случая',
          },
          metaDescription: {
            ru: 'Вафельные трубочки — лёгкие, хрустящие и универсальные. Идеально подходят как самостоятельное лакомство или дополнение к десертам и напиткам.',
          },
          masterVariant: {
            id: 1,
            sku: 'ROLLS-EMPTY',
            key: 'rolls-empty',
            prices: [
              {
                id: '4c028214-2061-4776-9c99-1a2a6db2b895',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 2000,
                  fractionDigits: 2,
                },
                key: 'rolls-empty',
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/empty-rolls-s-zL0jYOC0.png',
                dimensions: {
                  w: 181,
                  h: 141,
                },
              },
            ],
            attributes: [
              {
                name: 'diet',
                value: [
                  {
                    key: 'gluten-free',
                    label: 'без глютена',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value: 'Вафельные трубочки без начинки',
              },
              {
                name: 'weight',
                value: 8,
              },
              {
                name: 'description',
                value: {
                  ru: 'Лёгкие, хрустящие вафельные трубочки идеально подходят для тех, кто ценит чистый вкус и текстуру. Их можно подавать как самостоятельное лакомство или использовать в качестве дополнения к чаю или кофе.',
                },
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'ROLLS-BUTTERCREAM',
              key: 'rolls-buttercream',
              prices: [
                {
                  id: '1244b526-2719-43ab-86c6-bd545b3dbc61',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 6500,
                    fractionDigits: 2,
                  },
                  key: 'rolls-buttercream',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cottage-cream-rolls-rg6pZZqa.png',
                  dimensions: {
                    w: 181,
                    h: 139,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Вафельные трубочки с заварным кремом 'Наслаждение'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'custard',
                      label: 'заварной крем',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Эти вафельные трубочки наполнены воздушным заварным кремом, который идеально дополняет их хрустящую текстуру. Это лакомство станет украшением любого десертного стола!',
                  },
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'ROLLS-MILK',
              key: 'rolls-milk',
              prices: [
                {
                  id: '4fe8eab4-2918-4ceb-96f8-31ab0035a0bd',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'rolls-milk',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/milk-rolls-hHgyc3iS.png',
                  dimensions: {
                    w: 181,
                    h: 116,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Безглютеновые вафельные трубочки со сгущенным молоком 'Радость детства'",
                },
                {
                  name: 'weight',
                  value: 60,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'condensed-milk',
                      label: 'сгущенка',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Эти вафельные трубочки созданы для тех, кто ценит вкус детства и заботится о своём здоровье. Безглютеновое тесто в сочетании с нежной сладостью сгущённого молока создаёт уникальное лакомство, которое подарит удовольствие вам и вашим близким.',
                  },
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        staged: {
          name: {
            ru: 'Трубочки',
          },
          description: {
            ru: 'Вафельные трубочки могут быть с наполнением или без начинки',
          },
          categories: [
            {
              typeId: 'category',
              id: 'ef9f89cf-1e55-4f4b-8b11-b45795cc41d4',
            },
          ],
          categoryOrderHints: {},
          slug: {
            ru: 'rolls',
          },
          metaTitle: {
            ru: 'Вафельные трубочки — хрустящее лакомство для любого случая',
          },
          metaDescription: {
            ru: 'Вафельные трубочки — лёгкие, хрустящие и универсальные. Идеально подходят как самостоятельное лакомство или дополнение к десертам и напиткам.',
          },
          masterVariant: {
            id: 1,
            sku: 'ROLLS-EMPTY',
            key: 'rolls-empty',
            prices: [
              {
                id: '4c028214-2061-4776-9c99-1a2a6db2b895',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 2000,
                  fractionDigits: 2,
                },
                key: 'rolls-empty',
              },
            ],
            images: [
              {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/empty-rolls-s-zL0jYOC0.png',
                dimensions: {
                  w: 181,
                  h: 141,
                },
              },
            ],
            attributes: [
              {
                name: 'diet',
                value: [
                  {
                    key: 'gluten-free',
                    label: 'без глютена',
                  },
                ],
              },
              {
                name: 'promo',
                value: false,
              },
              {
                name: 'name',
                value: 'Вафельные трубочки без начинки',
              },
              {
                name: 'weight',
                value: 8,
              },
              {
                name: 'description',
                value: {
                  ru: 'Лёгкие, хрустящие вафельные трубочки идеально подходят для тех, кто ценит чистый вкус и текстуру. Их можно подавать как самостоятельное лакомство или использовать в качестве дополнения к чаю или кофе.',
                },
              },
            ],
            assets: [],
          },
          variants: [
            {
              id: 2,
              sku: 'ROLLS-BUTTERCREAM',
              key: 'rolls-buttercream',
              prices: [
                {
                  id: '1244b526-2719-43ab-86c6-bd545b3dbc61',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 6500,
                    fractionDigits: 2,
                  },
                  key: 'rolls-buttercream',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cottage-cream-rolls-rg6pZZqa.png',
                  dimensions: {
                    w: 181,
                    h: 139,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'traditional',
                      label: 'традиционная',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: false,
                },
                {
                  name: 'name',
                  value: "Вафельные трубочки с заварным кремом 'Наслаждение'",
                },
                {
                  name: 'weight',
                  value: 30,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'custard',
                      label: 'заварной крем',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Эти вафельные трубочки наполнены воздушным заварным кремом, который идеально дополняет их хрустящую текстуру. Это лакомство станет украшением любого десертного стола!',
                  },
                },
              ],
              assets: [],
            },
            {
              id: 3,
              sku: 'ROLLS-MILK',
              key: 'rolls-milk',
              prices: [
                {
                  id: '4fe8eab4-2918-4ceb-96f8-31ab0035a0bd',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 7000,
                    fractionDigits: 2,
                  },
                  key: 'rolls-milk',
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/milk-rolls-hHgyc3iS.png',
                  dimensions: {
                    w: 181,
                    h: 116,
                  },
                },
              ],
              attributes: [
                {
                  name: 'flavors',
                  value: [
                    {
                      key: 'milky',
                      label: 'молочный',
                    },
                  ],
                },
                {
                  name: 'diet',
                  value: [
                    {
                      key: 'gluten-free',
                      label: 'без глютена',
                    },
                  ],
                },
                {
                  name: 'promo',
                  value: true,
                },
                {
                  name: 'name',
                  value: "Безглютеновые вафельные трубочки со сгущенным молоком 'Радость детства'",
                },
                {
                  name: 'weight',
                  value: 60,
                },
                {
                  name: 'filling',
                  value: [
                    {
                      key: 'condensed-milk',
                      label: 'сгущенка',
                    },
                  ],
                },
                {
                  name: 'description',
                  value: {
                    ru: 'Эти вафельные трубочки созданы для тех, кто ценит вкус детства и заботится о своём здоровье. Безглютеновое тесто в сочетании с нежной сладостью сгущённого молока создаёт уникальное лакомство, которое подарит удовольствие вам и вашим близким.',
                  },
                },
              ],
              assets: [],
            },
          ],
          searchKeywords: {},
          attributes: [],
        },
        published: true,
        hasStagedChanges: false,
      },
      key: 'rolls',
      priceMode: 'Embedded',
      lastVariantId: 3,
    },
  ],
};

const productData = allProducts.results[0].masterData.current;
export default productData;
