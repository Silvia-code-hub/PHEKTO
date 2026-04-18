const db = require('../config/database');

const cartController = {
    getUserCart: async (req, res) =>{
        try{
        const userCart = await db.query('SELECT * FROM carts WHERE user_id = ?', [req.params.userId]);
        console.log('get all items in usercart', userCart);

        res.json({
            success: true,
            data: userCart

        });
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: 'userCart not available'
        });
    }
    },

    addToCart: async (req, res) => {
        try{
         
            
        const { user_id, product_id, quantity} = req.body;
        
        if (!user_id || !product_id || !quantity) {
            console.log(' Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'user_id, product_id, and quantity are required'
            });
        }
         


        const existingCartItem = await db.getOne('Select * FROM carts WHERE user_id = ?  AND product_id = ?',[user_id, product_id ]);
        if(existingCartItem) {
           
            await db.update ('UPDATE carts SET quantity = quantity + ? WHERE cart_id = ?', [quantity, existingCartItem.cart_id]);
            console.log('quantity updated', quantity);
        } else {
            await db.insert('INSERT INTO carts(user_id, product_id, quantity,created_at,updated_at ) VALUES ( ?, ?, ?, NOW(), NOW()) ', [user_id, product_id, quantity]);
        }
        res.json({
            success: true,
            message: 'Item added to cart'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'item failed to be added to cart'
        });
    } 

    },
    updateCart: async (req, res ) =>{
        try{
            const cartId = req.params.cartId;
            const { quantity} = req.body;

            const existingItem = await db.getOne('SELECT * FROM carts WHERE cart_id = ?', [cartId]);
            if (!existingItem) {
                res.status(400).json({
                    success: false,
                    message: 'CART ITEM NOT FOUND'
                });
                console.log('Cart item found', existingItem);
            }

        
        const result = await db.update('UPDATE carts SET quantity = ?, updated_at = NOW() WHERE cart_id = ?', [quantity, cartId]);
        console.log('Updated result',result);
         res.json({
            success: true,
            message: 'Cart item updated'

         });
    } catch (error){
        res.status(500).json({
            success: false,
            message: 'Item failed to be updated'
        })
    }
    },
    removeFromCart: async (req,res) =>{
        try{
        const cartId =req.params.cartId;
        await db.delete('DELETE FROM carts WHERE cart_id = ?', [cartId]);

        res.json({
            success: true,
            message: 'Cart item removed from cart'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart'
        });
    }
    },
    clearCart: async(req, res )=> {
        try{
        const userId = req.params.userId;
        await db.delete('DELETE FROM carts WHERE user_id = ? ', [userId]);

        res.json({
            success: true,
            message: 'User cart deleted'
        });
    } catch (error) {
         res.status(500).json({
            success: false,
            message: ' user cart failed to be deleted'
         });
        }
    },
}
module.exports = cartController;