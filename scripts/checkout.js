import renderCheckoutHeader from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import '../../data/cart-class.js';
// import '../../data/backend-practice.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';

// Promise.all is used to wait for multiple asynchronous operations to complete before proceeding. In this case, we are waiting for both the products and the cart to be loaded before rendering the checkout components. 

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
  // Here we are using a Promise to ensure that the products are loaded before rendering the checkout components. The loadProducts function is called, and once it completes, we resolve the promise and proceed to the next step.

  new Promise((resolve) => {
    loadProducts(() => {
      // resolve the promise after the products are loaded.
      resolve('value1');
    });

  }).then((value) => {
      console.log(value);
      return new Promise((resolve) => {
        loadCart(() => {
          resolve();
        });
      });

  }).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

/*
  loadProducts(() => {
    loadCart(() => {
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
*/
