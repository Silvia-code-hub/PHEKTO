const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../Services/emailService');

const generateTokens = async (user) => {
    const accessToken = jwt.sign(
        {id: user.user_id, email: user.email, user_type: user.user_type },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

     const refreshToken = jwt.sign(
        { id: user.user_id },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }  
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); 
    
    await db.insert(
        `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
        [user.user_id, refreshToken, expiresAt]
    );
    
    return { accessToken, refreshToken };
}





const authController = {
    register: async (req, res) => {
        try{
            const { username,email,password, first_name, last_name, phone } = req.body;

            const existingUser = await db.getOne(
                'SELECT user_id FROM users WHERE email = ? OR username = ?', [email, username] 
            );

            if (existingUser) {
                return res.status(400).json({
                    success:false,
                    error: 'User already exists'
                });
            }

            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds);

            const verificationToken = crypto.randomBytes(32).toString('hex');
            const tokenExpiry = new Date();
            tokenExpiry.setHours(tokenExpiry.getHours() + 24);
            console.log('Generated token:', verificationToken);
            console.log('Token expiry:', tokenExpiry);


            const userId = await db.insert(
                `INSERT INTO users 
                (username, email, password_hash ,first_name, last_name, phone, verification_token, verification_expires, is_verified, user_type, created_at, updated_at)
                VALUES (?,?,?,?,?,?,?,?, FALSE, 'customer', NOW(), NOW())`,
                [username, email, password_hash, first_name || null, last_name ||null, phone || null, verificationToken, tokenExpiry]

            );
             console.log('User created with ID:', userId);
            await sendVerificationEmail(email, verificationToken);

            res.status(201).json({
                success: true,
                message: 'Registration successful! Please check your email to verify your account.'

            });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                error: 'Registration failed'
            });
        }

    },

    verifyEmail: async (req, res) => {
        try{
            const { token } = req.body;

            const user = await db.getOne(
                `SELECT user_id FROM users WHERE verification_token = ?
                AND verification_expires > NOW() AND is_verified = FALSE`, [token]

            );

            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid or expired verification token'
                });
            }

            await db.update(
                `UPDATE users SET is_verified = TRUE,
                verification_token = NULL,
                verification_expires = NULL WHERE user_id = ?`, [user.user_id]
            );

            res.json({
                success: true,
                message: 'Email verified successfully! You can now log in.'
            });
        } catch (error) {
            console.error('Verification error:', error);
            res.status(500).json({
                success: false,
                error: ' verification failed'
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await db.getOne(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials'
                });
            }

            if (!user.is_verified) {
                return res.status(401).json({
                    success: false,
                    error: 'Please verify your email before logging in'
                });
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            
            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials'
                });
            }
            
            const { accessToken, refreshToken } = await generateTokens(user);
            
            const { password_hash, ...userWithoutPassword } = user;
            
            res.json({
                success: true,
                message: 'Login successful',
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: userWithoutPassword
            });
            
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                error: 'Login failed'
            });
        }
    },

    refreshToken: async (req, res) => {
        try{
           const { refreshToken } = req.body;
           
           if (!refreshToken) {
             return res.status(401).json({
                success: false,
                error: 'Refresh token required'
             });
           }
           let decoded;
           try{
            decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
           } catch (error) {
            return res.status(401).json({
                success: false,
                error: 'Invalid or expired refresh token'
            });
           }

            const storedToken = await db.getOne(
                `SELECT * FROM refresh_tokens 
                 WHERE token = ? AND revoked = FALSE AND expires_at > NOW()`,
                [refreshToken]
            );
            
            if (!storedToken) {
                return res.status(401).json({
                    success: false,
                    error: 'Refresh token not found or revoked'
                });
            }

            const user = await db.getOne(
                'SELECT * FROM users WHERE user_id = ?',
                [decoded.id]
            );
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'User not found'
                });
            }
             const newAccessToken = jwt.sign(
                { id: user.user_id, email: user.email, user_type: user.user_type },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );
            
            res.json({
                success: true,
                accessToken: newAccessToken
            });
            
        } catch (error) {
            console.error('Refresh token error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to refresh token'
            });
            
        }
    },

    logout: async (req, res) => {
        try{
            const { refreshToken } = req.body;

            if (refreshToken) {
                await db.update(
                    `UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?`,
                    [refreshToken]
                );

            }
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                success: false,
                error: 'Logout failed'
            });
        }
    }
};

module.exports = authController;