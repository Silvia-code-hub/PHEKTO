const db = require ('../config/database');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const userController  = {
    getAllUsers: async ( req, res ) =>{
        try{
            console.log('Fetching all users...');
            const users = await db.query(` SELECT user_id, username, email, first_name, last_name, phone, created_at, updated_at FROM users ORDER BY created_at DESC`) ;
            res.json({
                success: true,
                count:users.length,
                data: users

            });

        } catch (error) {
            res.status(500).json({
              success: false,
              error: 'Failed to fetch users'  
            });
        }
    },

    getUserById: async (req, res ) => {
        try {
            const requestedUserId = req.params.id;
            const authenticatedUserId = req.user.id;
            if(requestedUserId != authenticatedUserId) {
                return res.status(403).json({
                    success:false,
                    error: 'You are not authorized to view this user'
                });
            }
            if(req.params.id != req.user.id) {
                return res.status(403).json({
                    success: false,
                    error: ' You can only acccess your own account'
                });
            }
            
            const user = await db.getOne(`SELECT user_id, username, email, first_name, last_name, phone, created_at, updated_at FROM users WHERE user_id = ? `, [requestedUserId]);

            if(!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Error fetching user:', error.message);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch user'
            });
        }
    },

    register: async (req, res ) => {
        try{

            console.log('Received data', req.body);
            const{ username, email, password, first_name, last_name, phone } = req.body;
            console.log('username:', username);
            console.log('email:', email);
            console.log('password:', password);
            console.log('first_name:', first_name);
            console.log('last_name:', last_name);
            console.log('phone:', phone);

            
            if(!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'username, email, password are required'
                });
            } 
            const existingUser = await db.getOne (
                'SELECT user_id FROM users WHERE email = ? OR username = ?', [email, username]
            );
             if(existingUser) {
                return res.status(400).json({
                    success: false, 
                    error: ' User with this email or username already exists'
                });
             }

             const saltRounds = 10;
             const password_hash = await bcrypt.hash( password, saltRounds );

             const userId = await db.insert( `INSERT INTO users ( username, email, password_hash, first_name, last_name, phone, user_type, created_at, updated_at ) VALUES ( ?, ?, ?, ?, ?, ?,'customer', NOW(), NOW() )`,
                 [username, email, password_hash, first_name || null, last_name ||null, phone||null]);
             const newUser = await db.getOne(` SELECT user_id, username, email, first_name, last_name, phone, created_at, updated_at FROM users WHERE user_id = ? `, [userId]);
             res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: newUser
             });

        } catch (error) {
            console.error(' Registration error', error.message);
            res.status(500).json({
                success: false,
                error: 'Registration failed.Please try again later'
            });
        }
    },

    login: async( req, res ) =>{
        try{
            const{ email, password } = req.body;

        

            if(!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: ' Email and password are required'
                });
            }
            const user = await db.getOne( ' SELECT * FROM users WHERE email = ?', [email]);

             console.log('User found in database:', user ? 'YES' : 'NO');

            if(!user) {
                 
                return res.status(401).json({
                    success: false,
                    error: ' Invalid email or password'
                });
            }
            const passwordMatch = await bcrypt.compare( password, user.password_hash);
              console.log(' Password match result:', passwordMatch);

            if(!passwordMatch) {
                console.log('Password does NOT match for user:', email);
                return res.status(401).json({
                    success: false,
                    error: 'invalid password or email'
                });

            }
           
            const { password_hash, ...userWithoutPassword } = user;
             console.log(' Login successful for:', email);

              const token = jwt.sign({
                id:user.user_id,
                email: user.email,
                user_type: user.user_type
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

            res.json({
                success: true,
                message: 'Login successful',
                token: token,
                data: userWithoutPassword
            });
            
        } catch (error) {
            console.error (' Login error:', error.message);
            res.status(500).json({
                success: false,
                error: 'Login failed. Please try again later'
            });
        }
    },

    getCurrentUser: async (req, res) => {
    try {
        const user = await db.getOne(
            `SELECT user_id, username, email, first_name, last_name, phone, user_type, created_at 
             FROM users WHERE user_id = ?`,
            [req.user.id]
        );
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch user' });
    }
},
    
    updateUser: async (req, res ) => {
        try {
            const userId = req.params.id;
            if(req.params.id != req.user.id) {
                return res.status(403).json({
                    success: false,
                    error: 'You can only update your own account'
                });
            }

            const{ email, first_name, last_name, phone } = req.body;

            const existingUser = await db.getOne('SELECT * FROM users WHERE user_id = ?', [userId]);

             if (!existingUser) {
            console.log('User NOT found in database');

            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

            const result = await db.update (`UPDATE users SET  email = COALESCE ( ?, email), first_name = COALESCE (?, first_name), last_name = COALESCE ( ?, last_name), phone = COALESCE (?, phone), updated_at = NOW() WHERE user_id = ?`,
                 [ 
                email !== undefined ? email : null, 
                first_name !== undefined ? first_name : null, 
                last_name !== undefined ? last_name : null, 
                phone !== undefined ? phone : null,userId] );

          if (result === 0 ){  
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const updatedUser = await db.getOne(` SELECT user_id, username, email, first_name, last_name, phone, created_at FROM users WHERE user_id = ?`, [userId]);
        res.json({
            success: true,
            message: 'User updated successfully' ,
            data: updatedUser
        });

        } catch (error) {
            res.status(500).json ({
                success: false,
                error: 'User is not Found '
            });

        }
    },



    deleteUser: async (req, res) => {
        try{
           const userId = req.params.id;
           if( req.params.id != req.user.id){
            return res.status(403).json({
                success: false,
                error: 'You can only delete your own account'
            });
           }
           
           const result = await db.delete ('DELETE FROM users WHERE user_id = ?',[ userId]);

           if (result === 0 ) {
            return res.status(404).json({
                success : false ,
                error: ' User not found'

            });
           }
           res.json({
            success: true,
            message: 'User deleted succcessfully'
           });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Could not delete user'
            });

        }
    }

   
    
   
    
}
 module.exports = userController;