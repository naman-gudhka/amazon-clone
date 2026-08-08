import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../data/cart.js";
import {loadProducts, loadProductsFetch, products} from "../../data/products.js";

beforeAll(async () => {
  await loadProductsFetch();
});

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
  });

  it('displays the cart', () => {

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${productID1}`).innerText).toContain('Quantity: 2');

    expect(document.querySelector(`.js-product-quantity-${productID2}`).innerText).toContain('Quantity: 1');

    expect(document.querySelector(`.js-product-name-test-${productID1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(document.querySelector(`.js-product-name-test-${productID2}`).innerText).toEqual('Intermediate Size Basketball');

    expect(document.querySelector(`.js-product-price-test-${productID1}`).innerText).toContain('$');

    expect(document.querySelector(`.js-product-price-test-${productID2}`).innerText).toContain('$');
  });

  it('removes a product', () => {
    
    document.querySelector(`.js-delete-link-${productID1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(document.querySelector(`.js-cart-item-container-${productID1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productID2}`)).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productID2);

    expect(document.querySelector(`.js-product-name-test-${productID2}`).innerText).toEqual('Intermediate Size Basketball');

    expect(document.querySelector(`.js-product-price-test-${productID2}`).innerText).toContain('$');
  });

  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productID1}-3`).click();
    expect(document.querySelector(`.js-delivery-option-input-${productID1}-3`).checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productID1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');

    expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$63.50');
  });
});