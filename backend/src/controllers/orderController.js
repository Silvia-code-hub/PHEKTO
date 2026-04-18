const db = require('../config/database');

const orderController = {
    createOrder: async (req , res) => {
        try{
            const {user_id, payment_method, shipping_address } = req.body;
            console.log('REQUEST BODY:', req.body);
            if(!user_id) {
                return res.status(400).json({
                    success:false,
                    message: 'User_id is required'
                });
            }
            console.log('fetching cart for user',user_id);
            const cartItems = await db.query(`SELECT c.*, p.price, p.name FROM carts c JOIN products p ON c.product_id = p.product_id WHERE c.user_id = ? `, [user_id]);
            console.log('Cart items found:', cartItems.length);

            if(cartItems.length === 0){
                return res.status(400).json({
                    success: false,
                    message: 'Cart is empty. Additems before checkout'
                });
            } 

                console.log('calculating total amount');
                let totalAmount = 0;
                for (let item of cartItems) {
                     const subtotal =  item.price * item.quantity;
                     totalAmount += subtotal;
                     
                }
                console.log ('Total amount:', totalAmount);

                console.log('Generating order number');
                const orderNumber = 'ORD-' + Date.now() +'-'+ user_id;
                 console.log('Order data:', {
            user_id,
            orderNumber,
            totalAmount,
            payment_method,
            shipping_address
        });

            
            const orderId = await db.insert(
                 `INSERT INTO orders
            (user_id, order_number, total_amount, payment_method, status, shipping_address, created_at, updated_at) 
            VALUES(?, ?, ?, ?, 'pending', ?, NOW(), NOW())`,
            [user_id, orderNumber, totalAmount, payment_method || null, shipping_address || null]
        );
            
            console.log('6 Order created with ID:', orderId);
            console.log('Adding items into order_items...');
             for (let item of cartItems) {
                const subtotal = item.price * item.quantity;
                await db.insert(`INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
                     VALUES (?, ?, ?, ?, ?, ?)`, [orderId, item.product_id, item.name, item.price, item.quantity, subtotal]);
             }

             console.log('Clearing cart...');
             await db.delete('DELETE FROM carts WHERE user_id = ?', [user_id]);

              console.log(' Fetching new order...');
             const newOrder = await db.getOne(`SELECT * FROM orders WHERE order_id = ? `, [orderId]);
             const orderItems = await db.query(`SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = ?`, [orderId]);

             res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data:{
                    order: newOrder,

                    items: orderItems
                }
             });


        }catch(error) {
            console.error(' ERROR DETAILS:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        if (error.sql) {
            console.error('SQL Error:', error.sql);
        }
        if (error.code) {
            console.error('Error code:', error.code);
        }
            res.status(500).json({
                success: false,
                message: 'Failed to create order'
            });

        }
    },
    getuserOrders: async (req, res) => {
        try{
            const userId = req.params.userId;
            console.log('Fetching all orders for user:',userId);

            const orders = await db.query(
                `SELECT * FROM orders WHERE user_id = ? ORDER BY order_date  DESC`, [userId]
            );

            const ordersWithItems = [];
            for(let order of orders) {
             const items = await db.query(
                    `SELECT oi.*, p.name, p.image_url 
                     FROM order_items oi
                     JOIN products p ON oi.product_id = p.product_id
                     WHERE oi.order_id = ?`,
                    [order.order_id]
                );
                  ordersWithItems.push({
                    ...order,
                    items: items
                });  
            }
            res.json({
                success: true,
                count: ordersWithItems.length,
                data: ordersWithItems
            });

        }  catch(error) {

             res.status(500).json({
                success: false,
                message: 'Failed to fetch orders',
                
            });

        }
    },
    getOrderById: async (req, res) => {
        try{
            const orderId = req.params.orderId;

            console.log('Fetching order...', orderId);

            const order = await db.query(`SELECT o.*, u.username,u.email FROM orders o JOIN users u ON  u.user_id = o.user_id WHERE o.order_id = ?`, [orderId]);
             console.log('Order found:', order);

            if(!order) {
               return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            const items = await db.query(`SELECT oi.* ,p.name,p.image_url, p.sku FROM order_items oi JOIN products p ON oi.product_id =  p.product_id WHERE oi.order_id = ?`, [orderId]);
            res.json({
                success: true,
                data: {
                    ...order,
                    items: items
                }
            });
        } catch(error) {
             res.status(500).json({
                success: false,
                message: 'Failed to fetch order',
             
            });
        }
    },
    updateOrderStatus: async (req, res) => {
        try{
            const orderId = req.params.orderId;
            const {status} = req.body;
            const validStatuses = ['pending','processing', 'shipped', 'delivered', 'cancelled'];
             if(!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Status must be of : ${validStatuses.join(',')}`
                });
             }

             console.log('Checking if order exists...');
             const order = await db.getOne('SELECT * FROM orders WHERE order_id = ?', [orderId]);
             if(!order) {
                return res.status(404).json({
                    success: false,
                    message: ' Order Not Found'
                });
             }

             await db.update(`UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?`, [status, orderId]);

             console.log('Get the updated order...');
             const updatedOrder = await db.getOne('SELECT* FROM orders WHERE order_id = ? ', [orderId]);
             res.json({
                success: true,
                message: 'Order status updated successfully',
                data: updatedOrder
             });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update order status'
            });

        }
    },
    cancelOrder: async (req, res) => {
        try{
            const orderId = req.params.orderId;
            const userId = req.body.userId;

          console.log(' CANCEL ORDER ATTEMPT');
          console.log('Order ID:', orderId);
          console.log('User ID:', userId);

        
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required'
            });
        }
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

            console.log('Check if order exists for the user');


            const order = await db.getOne('SELECT * FROM orders WHERE order_id = ? AND user_id = ?', [orderId, userId]);
            if(!order) {
                return res.status(404).json({
                    success: false,
                    message: ' Order not found or does not belong to you'
                });
                
            }
             console.log('Order found:', order);
             console.log('Current status:', order.status);


             if(order.status !== 'pending') {
                return res.status(400).json({
                    success: false,
                    message: `Cannot cancel orders with status: ${order.status}`
                });
             }

             const result = await db.update( 'UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?', ['cancelled', orderId]);
              res.json({
                success: true,
                message: 'Order cancelled successfully',
                data: result
            });
        } catch(error) {
            res.status(500).json({
                success: false,
                message: 'Failed to cancel order',
                
            });
        }
    },

     getAllOrders: async (req, res) => {
        try {
            const orders = await db.query(
                `SELECT o.*, u.username, u.email 
                 FROM orders o
                 JOIN users u ON o.user_id = u.user_id
                 ORDER BY o.order_date DESC`
            );
            
            res.json({
                success: true,
                count: orders.length,
                data: orders
            });
            
        } catch (error) {
            
            res.status(500).json({
                success: false,
                message: 'Failed to fetch orders',
               
            });
        }
    }

};

module.exports = orderController;