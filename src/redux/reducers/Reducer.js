let defaultState = {
    selectedItems:{items:[]},
    loginInfo:{loggedIn:false,data:{}},
    userAddresses:[],
    selectedTheme:"",
    selectedFontSize:"",
    selectedFont:"",
    BottomTabsDisplayed:true
};

let Reducer = (state=defaultState, action)=>{
    switch(action.type){
        /*Cart functionality and cart data */
        case "ADD_TO_CART":{
            let newState = {...state};
            newState.selectedItems={
                items:[...newState.selectedItems.items,action.payload],
            }
            return newState;
        }

        case "UPDATE_CART":{
            let update_state = {...state};
            //console.log(update_state.selectedItems.includes(action.payload));
            function update(){
                for(let i=0;i<update_state.selectedItems.items.length;i++){
                    if(update_state.selectedItems.items[i].productID == action.payload.productID){
                        update_state.selectedItems.items[i] = action.payload;
                        return update_state.selectedItems.items;
                    }
                }
            }
            update_state.selectedItems = {items:update()};
            return update_state;
        }

        case "DELETE_PRODUCT":{
            let delete_from_state = {...state};
            function delete_from_cart(){
                for(let i=0;i<delete_from_state.selectedItems.items.length;i++){
                    if(delete_from_state.selectedItems.items[i].productID==action.payload.productID){
                        delete_from_state.selectedItems.items.splice(i,1);
                        return delete_from_state.selectedItems.items;
                    }
                }
            }
            
	        delete_from_state.selectedItems = {items:delete_from_cart()};
            return delete_from_state;
        }
        case "CLEAN_CART":{
            let cleaned_cart = {...state};
            cleaned_cart.selectedItems = {
                items:[]
            }
            return cleaned_cart;
        }
        /****************************/

        /*login functionality and login data*/    
        case "LOGIN":{
            let loginState = {...state};
            loginState.loginInfo = action.payload;
            return loginState;
            }
        case "LOGOUT":{
            let logoutState = {...state};
            logoutState.loginInfo = {
                loggedIn:false,
                data:{}
            }
            return logoutState;
        }
        /**************************/
        
        /*Update app theme */
        case "UPDATE_THEME":{
            let themeState = {...state};
            themeState.selectedTheme = action.payload;
            return themeState;
        }
        /*************************/
        /*Update app font size */
        case "UPDATE_FONT_SIZE":{
            let fontSizeState = {...state};
            fontSizeState.selectedFontSize = action.payload;
            return fontSizeState;
        }
        /*************************/
        /*Update app font type */
        case "UPDATE_FONT":{
            let fontState = {...state};
            fontState.selectedFont = action.payload;
            return fontState;
        }
        /*************************/

        /*Toggle Bottom tabs display*/
        case "TOGGLE_BOTTOM_TABS":{
            let tabsState = {...state};
            tabsState.BottomTabsDisplayed = action.payload;
            return tabsState;
        }
        /*****************************/
        /*User addresses*/
        case "USER_ADDRESSES":{
            let addressesState = {...state};
            addressesState.userAddresses = action.payload;
            return addressesState;

        }
        /***************/
        default:{
            return state;
        }

    }
}

export default Reducer;