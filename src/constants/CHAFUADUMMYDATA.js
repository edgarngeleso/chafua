export const CHAFUADUMMYDATA = {
    user:{userID:1,
        userName:"Edgar",
        firstName:"Edgar",
        lastName:"Ngeleso",
        email:"edgarngereso@gmail.com",
        password:"1234",},
        
    hotels:[{hotelID:1,hotelName:"Hotel 1",hotelStars:3},
            {hotelID:2,hotelName:"Hotel 2",hotelStars:4},
            {hotelID:3,hotelName:"Hotel 3",hotelStars:3},
            {hotelID:4,hotelName:"Hotel 4",hotelStars:4}],
    addresses:[{addressID:1,addressName:"Block C",room:"1"},
                {addressID:3,addressName:"Block D",room:"20"}],

    orders:[{orderID:1,
            foods:[{foodID:1,quantity:2,unitPrice:100,total:200}],
            packagingFee:20,
            orderTotal:220},
            {orderID:1,
            foods:[{foodID:4,quantity:3,unitPrice:50,total:150}],
            packagingFee:15,
            orderTotal:165}],

    foods:[{foodID:1,foodName:"Food 1",unitPrice:100,foodStars:4},
            {foodID:2,foodName:"Food 2",unitPrice:80,foodStars:4},
            {foodID:3,foodName:"Food 3",unitPrice:60,foodStars:4},
            {foodID:4,foodName:"Food 3",unitPrice:50,foodStars:4}],

    categories:[{categoryID:1,categoryName:"Food",categoryImage:""},
                {categoryID:2,categoryName:"Drinks",categoryImage:""},
                {categoryID:3,categoryName:"Fruits",categoryImage:""},
                {categoryID:4,categoryName:"Snacks",categoryImage:""}]
}