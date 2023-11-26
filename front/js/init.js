const CATEGORIES_URL = "http://localhost:3000/json/cats/cat.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/json/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/json/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/json/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/json/products_comments/";
const CART_INFO_URL = "http://localhost:3000/json/user_cart/25801.js";
const CART_BUY_URL = "http://localhost:3000/json/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}