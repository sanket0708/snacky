import userModel from "../models/userModel.js"

//add items to cart 
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.user.id, { cartData })
        res.json({ success: true, message: "Added to cart!" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!" })

    }
}

const removeFromCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.user.id, { cartData });
        res.json({ success: true, message: "Removed from cart!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!" })
    }

}

const getCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!" })
    }

}

export { addToCart, removeFromCart, getCart }