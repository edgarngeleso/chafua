/**
 * Android emulator ip on local address
 * 10.0.2.2:port
 * In this case will be http://10.0.2.2:85/api/api.php
 */

let URL = "http://10.0.2.2:85";
//let URL = "https://chafua-admin.co.ke";
let APIURL = `${URL}/api/api.php`;
const APPDATAURLS = {
    mainURL:URL,
    apiURL:APIURL,
    advertsURL:`${APIURL}?adverts=all`,
    activeAdvertsURL:`${APIURL}?activeAdverts=all`,
    productsURL:`${APIURL}?products=all`,
    productDataURL:`${APIURL}?productID=`,
    hotelsURL:`${APIURL}?hotels=all`,
    hotelProductsURL:`${APIURL}?hotelID=`,
    categoriesURL:`${APIURL}?categories=all`,
    categoryProductsURL:`${APIURL}?categoryID=`,
    customerOrdersURL:`${APIURL}?customerID=`,
    customerAddresesURL:`${APIURL}?customerAddressesByID=`,
    customerOrders:`${APIURL}?customerIDOrders=`,
}

export default APPDATAURLS;