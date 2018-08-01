/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

// import queryString from 'query-string';
// import { EventTypes } from 'redux-segment';
// import Api from '../../lib/api';
// import { actions as modalActions } from '../modal';
// import { actions as userActions } from '../user';
// import { orderFormMessages, /* receiptMessages */} from '../messages';

// ------------------------------------
// Constants
// ------------------------------------
// const LOAD_OFFER_REQEUST = 'LOAD_OFFER_REQEUST';
// const LOAD_OFFER_SUCCESS = 'LOAD_OFFER_SUCCESS';

// const SET_PRODUCT_AMOUNT = 'SET_PRODUCT_AMOUNT';
// const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
// const SET_NEW_ADDRESS = 'SET_NEW_ADDRESS';

// const ADD_PHYSICAL_PRODUCT = 'ADD_PHYSICAL_PRODUCT';
// const REMOVE_PHYSICAL_PRODUCT = 'REMOVE_PHYSICAL_PRODUCT';
// const UPDATE_BUMP_OFFERS = 'UPDATE_BUMP_OFFERS';
// const UPDATE_SUB_TOTAL = 'UPDATE_SUB_TOTAL';
// const UPDATE_TOTALS = 'UPDATE_TOTALS';

// // const PROCESS_CHECKOUT_REQUEST = 'PROCESS_CHECKOUT_REQUEST';
// const PROCESS_CHECKOUT_SUCCESS = 'PROCESS_CHECKOUT_SUCCESS';
// // const PROCESS_CHECKOUT_FAILED = 'PROCESS_CHECKOUT_FAILED';

// const SET_PURCHASED_PRODUCTS = 'SET_PURCHASED_PRODUCTS';
// const SET_ORDER = 'SET_ORDER';
// const SET_RECOMMENDED_PRODUCTS = 'SET_RECOMMENDED_PRODUCTS';
// const SET_UPSELL_DEADLINE = 'SET_UPSELL_DEADLINE';
// const DISABLE_UPSELL = 'DISABLE_UPSELL';
// const PROCESS_UPSELL_SUCCESS = 'PROCESS_UPSELL_SUCCESS';

// const SET_SELECTED_BILLING_ADDRESS = 'SET_SELECTED_BILLING_ADDRESS';
// const SET_SELECTED_SHIPPING_ADDRESS = 'SET_SELECTED_SHIPPING_ADDRESS';

// const SET_USER_PAYMENT_ID = 'SET_USER_PAYMENT_ID';

const SET_NEW_USER = 'SET_NEW_USER';

const SET_STEPS = 'SET_STEPS';
const SET_CURRENT_STEP = 'SET_CURRENT_STEP';
const SET_STEP_VALIDITY = 'SET_STEP_VALIDITY';


// ------------------------------------
// Actions
// ------------------------------------


const receiveOffer = offer => ({
  type: LOAD_OFFER_SUCCESS,
  offer
});



const setNewUser = newUser => ({
  type: SET_NEW_USER,
  newUser
});



const updateTotals = totals => ({
  type: UPDATE_TOTALS,
  totals
});

// const checkoutSuccess = resp => ({
//   type: PROCESS_CHECKOUT_SUCCESS,
//   submitted: true,
//   meta: {
//     analytics: {
//       eventType: EventTypes.track,
//       eventPayload: {
//         event: 'Completed Order',
//         properties: {
//           orderId: resp.Order.id,
//           total: resp.Order.total,
//           revenue: resp.Order.subtotal,
//           shipping: resp.Order.shipping,
//           tax: resp.Order.tax,
//           current: 'USD',
//           products: resp.Order.OrderProducts.map(prod => ({
//             id: prod.ProductId,
//             name: prod.Product.name,
//             sku: prod.Product.slug,
//             price: prod.price,
//             quantity: prod.qtyOrdered
//           }))
//         },
//         options: {
//           userId: resp.Order.UserId,
//           email: resp.Order.User.email,
//         }
//       }
//     }
//   }
// });

// const upsellSuccess = (resp, upSellId) => {
//   const upsellTransactions = resp.OrderTransactions
//     .filter(trans => trans.upSellIds === upSellId.toString());
//   const meta = upsellTransactions.length === 1 ?
//     {
//       analytics: {
//         eventType: EventTypes.track,
//         eventPayload: {
//           event: 'Completed Order',
//           properties: {
//             orderId: resp.id,
//             total: upsellTransactions[0].amount,
//             revenue: upsellTransactions[0].TransactionProducts
//               .reduce((acc, p) => (acc || 0) + p.price * p.qtyOrdered),
//             shipping: upsellTransactions[0].TransactionProducts
//               .reduce((acc, p) => (acc || 0) + p.shipping),
//             tax: upsellTransactions[0].TransactionProducts
//               .reduce((acc, p) => (acc || 0) + p.tax * p.qtyOrdered),
//             current: 'USD',
//             products: upsellTransactions[0].TransactionProducts
//               .map(prod => (Object.assign({
//                 id: prod.ProductId,
//                 price: prod.price
//               }, (resp.OrderProducts
//                   .filter(op => op.ProductId === prod.ProductId)
//                   .reduce((acc, val) => ({
//                     sku: val.Product.slug,
//                     name: val.Product.name
//                   }), null)))
//               ))
//           }
//         }
//       }
//     }
//     : null;
//   return ({
//     type: PROCESS_UPSELL_SUCCESS,
//     meta
//   });
// };

// const setPurchasedProducts = purchasedProducts => ({
//   type: SET_PURCHASED_PRODUCTS,
//   purchasedProducts
// });

// const setOrder = order => ({
//   type: SET_ORDER,
//   order
// });

// const setRecommendedProducts = products => ({
//   type: SET_RECOMMENDED_PRODUCTS,
//   products
// });

// const setUpsellDeadline = deadline => ({
//   type: SET_UPSELL_DEADLINE,
//   deadline
// });

// const disableUpsell = () => ({
//   type: DISABLE_UPSELL
// });

// const setSelectedBillingAddress = id => ({
//   type: SET_SELECTED_BILLING_ADDRESS,
//   id
// });

// const setSelectedShippingAddress = id => ({
//   type: SET_SELECTED_SHIPPING_ADDRESS,
//   id
// });

// const setSelectedUserPaymentId = id => ({
//   type: SET_USER_PAYMENT_ID,
//   id
// });

// const setSelectedPaymentOption = id => ({
//   type: SET_SELECTED_PAYMENT_OPTION,
//   id
// });

// const setBraintreeValidity = (field, validity) => ({
//   type: SET_BRAINTREE_VALIDITY,
//   field,
//   validity
// });

// const blurBraintreeField = field => ({
//   type: BLUR_BRAINTREE_FIELD,
//   field
// });

// const setBraintreeReady = boolean => ({
//   type: SET_BRAINTREE_READY,
//   boolean
// });

// const setOrderFormMessage = gatewayCode => ({
//   type: SET_ORDER_FORM_MESSAGE,
//   orderFormMessage: orderFormMessages[gatewayCode]
// });

// const setReceiptMessage = gatewayCode => ({
//   type: SET_RECEIPT_MESSAGE,
//   receiptMessage: receiptMessages[gatewayCode]
// });

// const setOrderId = OrderId => ({
//   type: SET_ORDER_ID,
//   OrderId
// });

// const setSteps = steps => ({
//   type: SET_STEPS,
//   steps
// });

// const setCurrentStep = (currentStep, previousStep) => ({
//   type: SET_CURRENT_STEP,
//   currentStep,
//   meta: {
//     analytics: {
//       eventType: EventTypes.track,
//       eventPayload: {
//         event: 'Checkout Step Completed',
//         properties: {
//           step: previousStep
//         }
//       }
//     }
//   }
// });

// const setStepValidity = stepValidity => ({
//   type: SET_STEP_VALIDITY,
//   stepValidity
// });

// const updateQuantity = (quantity) => {
//   if (quantity <= 0) {
//     return {
//       type: UPDATE_QUANTITY,
//       quantity: 0
//     };
//   }
//   return {
//     type: UPDATE_QUANTITY,
//     quantity
//   };
// };

// const updateBumpOfferQuantities = bumpOfferQuantities => ({
//   type: UPDATE_QUANTITY,
//   bumpOfferQuantities
// });

// const setCookie = cookie => ({
//   type: SET_COOKIE,
//   cookie
// });

// const splitTestOptionsFirst = () => ({
//   type: SPLIT_TEST_OPTIONS_FIRST
// });

// const reset = () => ({
//   type: RESET
// });

// ------------------------------------
// Helpers for Helpers
// ------------------------------------

// const createOrderRequest = (getState) => {
//   const {
//     id,
//     BumpOffers,
//     bumpOfferQuantities,
//     cookie,
//     giftRecipient,
//     isGift,
//     newBillingAddress,
//     paymentMethod,
//     quantity,
//     selectedBillingAddressId,
//     selectedShippingAddressId,
//     selectedUserPaymentMethodId,
//     selectedPaymentOption
//   } = getState().checkout;

//   const {
//     isAuthenticated,
//     email,
//     firstName,
//     lastName,
//   } = getState().user;

//   const User = isAuthenticated ?
//     { email, firstName, lastName } :
//     getState().checkout.newUser;

//   const BumpOfferIds = [];
//   const BumpOfferQuantities = [];
//   let BillingAddress;
//   let ShippingAddress;

//   BumpOffers.map((bumpOffer) => {
//     if (!bumpOffer) return;
//     BumpOfferIds.push(bumpOffer.OfferPaymentOptionBumpOffer.BumpOfferId);
//     BumpOfferQuantities.push(bumpOffer.quantity);
//   });

//   // Todo: break statement
//   const OfferPaymentOptionId = selectedPaymentOption;

//   // Set ShippingAddress
//   if (selectedShippingAddressId !== '0') {
//     ShippingAddress = { id: parseInt(selectedShippingAddressId, 10) };
//   } else if (getState().checkout.newShippingAddress) {
//     ShippingAddress = getState().checkout.newShippingAddress;
//   } else {
//     ShippingAddress = null;
//   }

//   // Set BillingAddress
//   if (selectedBillingAddressId !== '0') {
//     BillingAddress = { id: parseInt(selectedBillingAddressId, 10) };
//   } else if (newBillingAddress) {
//     BillingAddress = newBillingAddress;
//   } else {
//     BillingAddress = {};
//   }

//   // Format order
//   const OrderRequest = {
//     cookie,
//     BillingAddress,
//     BumpOfferIds,
//     BumpOfferQuantities,
//     isGift,
//     giftRecipient,
//     User,
//     OfferId: id,
//     OfferPaymentOptionId,
//     ShippingAddress,
//     PaymentMethod: paymentMethod,
//     Quantity: quantity,
//     UserPaymentMethodId: selectedUserPaymentMethodId
//   };

//   return OrderRequest;
// };

// const getCookie = (name) => {
//   const prop = `${name}=`;
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i += 1) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(prop) === 0) {
//       return c.substring(prop.length, c.length);
//     }
//   }
//   return '';
// };

// // ------------------------------------
// // Helpers
// // ------------------------------------

// const setOntraportCookies = () => (dispatch, getState) => {
//   const { cookie } = getState().checkout;
//   const aff_ = getCookie('aff_');
//   const opid = getCookie('opid');
//   if (aff_ && opid && (aff_ !== cookie.aff_ || opid !== cookie.opid)) {
//     dispatch(setCookie({ aff_, opid }));
//   }
// };

// export const loadTotals = () => (dispatch, getState) => {
//   dispatch(setOntraportCookies());
//   const currentTotals = getState().checkout.totals;
//   const offerId = getState().checkout.id;
//   const OrderRequest = createOrderRequest(getState);
//   const { selectedPaymentOption } = getState().checkout;

//   if (!selectedPaymentOption || !offerId) {
//     return;
//   }

//   OrderRequest.PaymentOptionId = selectedPaymentOption;

//   const { User } = OrderRequest;
//   if (!User || !User.email || !User.firstName || !User.lastName) {
//     OrderRequest.User = { email: 'anon@anon.com', firstName: 'validation', lastName: 'failed' };
//   }

//   return Api.post('/orders/totals', OrderRequest).then((resp) => {
//     if (resp.status === undefined) {
//       dispatch(updateTotals(resp));
//       // dispatch(updateTotals(resp));
//     } else {
//       if (resp.status && resp.status === 402) {
//         // set message here . . .
//         currentTotals.error = true;
//         dispatch(updateTotals(currentTotals));
//       }

//       // TODO: HANDLE ERRORS
//       currentTotals.error = true;
//       dispatch(updateTotals(currentTotals));
//     }
//   }).catch((error) => {
//     // Error message if totals returns faulty object
//     dispatch(setOrderFormMessage(999));
//     console.log('loadTotals ERROR: ', error);
//   });
// };

// const loadOffer = slug => (dispatch, getState) => {
//   dispatch(requestOffer(slug));

//   Api.get(`/offers/${slug}`).then((resp) => {
//     if (resp.status === undefined) {
//       resp.totals = { total: 0, order: { total: 0 } };
//       resp.BumpOffers = [];
//       resp.slug = slug;
//       dispatch(receiveOffer(resp));
//       if (resp.Product.requiresShippingAddress) dispatch(addPhysicalProduct(resp.Product.id));

//       resp.OfferPaymentOptions.map((option) => {
//         if (option.numInstallments === 1) {
//           dispatch(setSelectedPaymentOption(option.id));
//         }
//       });

//       // Set billing address to default if user is logged in
//       const defaultBillingAddress = getState().user.DefaultBillingAddress;
//       if (defaultBillingAddress.id !== undefined) {
//         dispatch(setSelectedBillingAddress(defaultBillingAddress.id.toString()));
//       }

//       const defaultShippingAddress = getState().user.DefaultShippingAddress;
//       if (defaultShippingAddress.id !== undefined) {
//         dispatch(setSelectedShippingAddress(defaultShippingAddress.id.toString()));
//       }

//       dispatch(loadTotals());
//     } else {
//       window.location.replace('/checkout/404');
//     }
//   }).catch((error) => {
//     console.log(error);
//     // TODO ERROR HANDLING
//     window.location.replace('/checkout/404');
//   });
// };

// const updateBumpOfferQuantity = (quantity, id) => (dispatch, getState) => {
//   if (quantity <= 0) return;
//   const { BumpOffers } = getState().checkout;
//   const newBumpOffers = [...BumpOffers];

//   for (const i in BumpOffers) {
//     if (BumpOffers[i].id === id) {
//       newBumpOffers[i].quantity = quantity;
//     }
//   }

//   dispatch(updateBumpOffers(newBumpOffers));
// };

// const clickBumpOffer = bumpOffer => (dispatch, getState) => {
//   const { BumpOffers } = getState().checkout;
//   // Status should be the opposite of what it currently is when selected
//   // const status = !bumpOffer.selected;
//   let exists = false;
//   let i;
//   BumpOffers.map((currentOffer, index) => {
//     if (!currentOffer) return;
//     if (currentOffer.OfferPaymentOptionBumpOffer.BumpOfferId === bumpOffer.OfferPaymentOptionBumpOffer.BumpOfferId) {
//       exists = true;
//       i = index;
//       BumpOffers[index] = null;
//     }
//   });

//   if (!exists) {
//     bumpOffer.quantity = 1;
//     BumpOffers.push(bumpOffer);
//     dispatch(updateBumpOfferQuantity(1, bumpOffer));
//   }

//   const filteredBumpOffers = BumpOffers.filter(value => value !== null);

//   dispatch(updateBumpOffers(filteredBumpOffers));

//   if (!exists) {
//     dispatch(updateBumpOfferQuantity(1, bumpOffer));
//   } else {
//     dispatch(updateBumpOfferQuantity(0, BumpOffers[i]));
//   }

//   // Check if physical product
//   if (bumpOffer.Product.requiresShippingAddress) {
//     const { physicalProducts } = getState().checkout;
//     if (!physicalProducts.includes(bumpOffer.Product.id)) {
//       dispatch(addPhysicalProduct(bumpOffer.Product.id));
//     } else {
//       // eslint-disable-next-line
//       const index = physicalProducts.map((product, index) => { if (product === bumpOffer.Product.id) return index; });
//       dispatch(removePhysicalProduct(index));
//     }
//   }

//   dispatch(loadTotals());
//   return true;
// };

// const updateProductAmount = amount => (dispatch, getState) => {
//   // get old productAmount
//   const currentProductAmount = getState().checkout.productAmount;
//   let { subTotal } = getState().checkout;
//   let newSubTotal;
//   subTotal = subTotal == null ? 0 : subTotal;
//   if (currentProductAmount !== null) {
//     newSubTotal = (subTotal - parseFloat(currentProductAmount)) + parseFloat(amount, 10);
//   } else {
//     newSubTotal = subTotal + parseFloat(amount, 10);
//   }
//   dispatch(updateSubTotal(newSubTotal));
//   dispatch(setProductAmount(amount));
//   dispatch(loadTotals());
// };

// const processOrder = token => (dispatch, getState) => {
//   dispatch(modalActions.openModal('spinner'));
//   const {
//     BumpOffers,
//     purchasedProducts,
//     Product,
//     recommendedProducts,
//   } = getState().checkout;

//   const { authToken } = getState().user;

//   purchasedProducts.push(Product);

//   BumpOffers.map((bumperOffer) => {
//     if (bumperOffer.selected) {
//       purchasedProducts.push(bumperOffer.Product);
//     }
//   });

//   const gateway = token === 'manual' ? 'manual' : 'braintree';
//   const OrderRequest = createOrderRequest(getState);
//   OrderRequest.PaymentMethod = { gateway, gatewayToken: { id: token } };

//   return Api.post('/orders', OrderRequest, authToken).then((resp) => {
//     if (resp.status === undefined && resp.gatewayCode === undefined) {
//       dispatch(setPurchasedProducts(resp.Order.OrderProducts));
//       const timeLimitMinutes = 5;
//       const deadline = new Date(Date.parse(new Date()) + (timeLimitMinutes * 60 * 1000));
//       dispatch(setUpsellDeadline(deadline));
//       dispatch(checkoutSuccess(resp));
//       dispatch(setRecommendedProducts(recommendedProducts));
//       dispatch(setOrderFormMessage(0));
//       dispatch(setOrderId(resp.Order.id));
//       dispatch(setOrder(resp.Order));
//       if (resp.User) {
//         dispatch(userActions.receiveLogin(resp.User));
//       }

//       return purchasedProducts;
//     } else if (resp.gatewayCode) {
//       dispatch(setOrderFormMessage(resp.gatewayCode));
//       dispatch(modalActions.hideModal());
//     } else {
//       dispatch(setOrderFormMessage(999));
//       dispatch(modalActions.hideModal());
//     }
//   }).catch((err) => {
//     console.log('Process order err: ', err);
//   });
// };

// const processUpSell = id => (dispatch, getState) => {
//   dispatch(modalActions.openModal('spinner'));
//   const { OrderId, purchasedProducts } = getState().checkout;
//   const { authToken } = getState().user;
//   const upSellId = id;
//   const url = `/orders/${OrderId}/upsell/${upSellId}`;

//   return Api.post(url, {}, authToken).then((resp) => {
//     if (resp.status === undefined && resp.gatewayCode === undefined) {
//       // purchasedProducts.push(UpSells[0]);
//       dispatch(upsellSuccess(resp, upSellId));
//       dispatch(setPurchasedProducts(resp.OrderProducts));
//       dispatch(setOrder(resp));
//       dispatch(setOrderFormMessage(0));

//       return purchasedProducts;
//     } else if (resp.gatewayCode) {
//       dispatch(setOrderFormMessage(resp.gatewayCode));
//       dispatch(modalActions.hideModal());

//       return null;
//     }
//     dispatch(setOrderFormMessage(999));
//     dispatch(modalActions.hideModal());

//     return null;
//   });
// };

// const updateValidityStepA = (dispatch, getState) => {
//   const {
//     isGift, giftRecipient, newUser, stepValidity
//   } = getState().checkout;
//   const { postalCode } = getState().checkout.newBillingAddress;
//   const newBillingAddressIsValid = !!postalCode && !!postalCode.length;
//   const newUserIsValid = (
//     !!newUser.email &&
//     !!newUser.firstName &&
//     !!newUser.lastName &&
//     (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newUser.email)) &&
//     !!newBillingAddressIsValid
//   );
//   const giftRecipientIsValid = !isGift ||
//     !!giftRecipient.firstName.length &&
//     !!giftRecipient.lastName.length &&
//     !!giftRecipient.email.length &&
//     (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(giftRecipient.email));
//   stepValidity.A = newUserIsValid && giftRecipientIsValid;
//   dispatch(setStepValidity(stepValidity));
// };

// const updateValidityStepB = (dispatch, getState) => {
//   const { stepValidity } = getState().checkout;
//   stepValidity.B = true;
//   dispatch(setStepValidity(stepValidity));
// };

// const updateValidityStepC = (dispatch, getState) => {
//   const { stepValidity } = getState().checkout;
//   const { newShippingAddress } = getState().checkout;
//   const newShippingAddressIsValid = (
//     !!newShippingAddress.name &&
//     !!newShippingAddress.address1 &&
//     !!newShippingAddress.city &&
//     !!newShippingAddress.state &&
//     !!newShippingAddress.postalCode
//   );
//   stepValidity.C = newShippingAddressIsValid;
//   dispatch(setStepValidity(stepValidity));
// };

// const updateValidityStepD = (dispatch, getState) => {
//   const { stepValidity } = getState().checkout;
//   // const { postalCode } = getState().checkout.newBillingAddress;
//   // const newBillingAddressIsValid = !!postalCode.length;
//   stepValidity.D = true;
//   dispatch(setStepValidity(stepValidity));
// };

// const updateStepValidity = stepId => (dispatch, getState) => {
//   switch (stepId) {
//     case 'A':
//       updateValidityStepA(dispatch, getState);
//       break;

//     case 'B':
//       updateValidityStepB(dispatch, getState);
//       break;

//     case 'C':
//       updateValidityStepC(dispatch, getState);
//       break;

//     case 'D':
//       updateValidityStepD(dispatch, getState);
//       break;

//     default:
//       null;
//       break;
//   }
// };

// const resetOnLeavePage = () => (dispatch) => {
//   dispatch(reset());
// };

// // ------------------------------------
// // Action Handlers
// // ------------------------------------
// export const actions = {
//   loadOffer,
//   updateProductAmount,
//   setPaymentMethod,
//   setNewUser,
//   setNewAddress,
//   addPhysicalProduct,
//   clickBumpOffer,
//   loadTotals,
//   disableUpsell,
//   processOrder,
//   processUpSell,
//   receiveOffer,
//   resetOnLeavePage,
//   setBraintreeValidity,
//   setGiftRecipient,
//   toggleIsGift,
//   blurBraintreeField,
//   setBraintreeReady,
//   setCurrentStep,
//   setOntraportCookies,
//   setOrderFormMessage,
//   setReceiptMessage,
//   setSteps,
//   setSelectedBillingAddress,
//   setSelectedPaymentOption,
//   setSelectedShippingAddress,
//   setSelectedUserPaymentId,
//   splitTestOptionsFirst,
//   updateStepValidity,
//   updateBumpOfferQuantity,
//   updateQuantity
// };

// ------------------------------------
// Reducer
// ------------------------------------

const defaultTotals = {
  total: ''
};

const newUser = {
  email: '',
  firstName: '',
  lastName: '',
  phone: ''
};

export const initialState = {
  newUser,
  totals: defaultTotals
};

// export const initialState = {
//   cookie: { aff_: null, opid: null },
//   currentStep: 0,
//   id: null,
//   isGift: false,
//   giftable: false,
//   giftRecipient: {
//     firstName: '',
//     lastName: '',
//     email: ''
//   },
//   name: '',
//   description: '',
//   slug: '',
//   ProductId: 12345,
//   UpSells: [],
//   Product: {},
//   PaymentOptions: [],
//   BumpOffers: [],
//   bumpOfferQuantities: [],
//   physicalProducts: [],
//   subTotal: 0,
//   steps: [],
//   productAmount: null,
//   paymentMethod: 'braintree',
//   newBillingAddress: {
//     name: '',
//     address1: '',
//     address2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     empty: true
//   },
//   newShippingAddress: {
//     name: '',
//     address1: '',
//     address2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     empty: true
//   },
//   submitted: false,
//   optionsFirst: false,
//   orderFormMessage: {},
//   order: {},
//   purchasedProducts: [],
//   quantity: 1,
//   receiptMessage: {},
//   recommendedProducts: [],
//   newUser,
//   upsellDeadline: null,
//   upsellExpired: false,
//   selectedBillingAddressId: '0',
//   selectedShippingAddressId: '0',
//   selectedUserPaymentMethodId: '0',
//   selectedPaymentOption: null,
//   stepValidity: {
//     A: false, B: false, C: false, D: false
//   },
//   totals: defaultTotals,
//   braintreeValidity: {
//     cvvValid: false,
//     numberValid: false,
//     expirationDateValid: false,
//     cvvBlurred: false,
//     numberBlurred: false,
//     expirationDateBlurred: false
//   },
//   isFormValid: false
// };

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {

    // case UPDATE_TOTALS:
    //   return {
    //     ...state,
    //     totals: action.totals
    //   };

    // case LOAD_OFFER_SUCCESS:
    //   return {
    //     ...state,
    //     description: action.offer.description,
    //     giftable: action.offer.giftable,
    //     id: action.offer.id,
    //     image: action.offer.image,
    //     name: action.offer.name,
    //     OfferPaymentOptions: action.offer.OfferPaymentOptions,
    //     PaymentOptions: action.offer.PaymentOptions,
    //     ProductId: action.offer.ProductId,
    //     Product: action.offer.Product,
    //     quantity: 1,
    //     slug: action.offer.slug
    //   };

    // case SET_NEW_USER:
    //   return {
    //     ...state,
    //     newUser: state.newUser
    //   };

    // case SET_STEP_VALIDITY:
    //   return {
    //     ...state,
    //     stepValidity: action.stepValidity
    //   };
    // case SET_CURRENT_STEP:
    //   return {
    //     ...state,
    //     currentStep: action.currentStep,
    //     previousStep: action.currentStep
    //   };
    // case SET_STEPS:
    //   return {
    //     ...state,
    //     steps: action.steps
    //   };

    default:
      return state;
  }
}
