import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../data/cart.js";

describe('Test suite: renderOrderSummary', () => {
  const productID1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productID2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productID1,
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: productID2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
  })

  it('displays the cart', () => {

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${productID1}`).innerText).toContain('Quantity: 2');

    expect(document.querySelector(`.js-product-quantity-${productID2}`).innerText).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    
    document.querySelector(`.js-delete-link-${productID1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(document.querySelector(`.js-cart-item-container-${productID1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productID2}`)).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productID2);
  });
});