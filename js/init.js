const CATEGORIES_URL = "http://localhost:3000/servidor/jsons/cats/cat.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/servidor/jsons/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/servidor/jsons/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/servidor/jsons/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/servidor/jsons/products_comments/";
const CART_INFO_URL = "http://localhost:3000/servidor/jsons/user_cart/25801.json";
const CART_BUY_URL = "http://localhost:3000/servidor/jsons/cart/buy.json";
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