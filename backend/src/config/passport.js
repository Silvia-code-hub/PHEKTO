const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./database');
const crypto = require('crypto');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try{
        console.log('Google profile received', profile.emails?.[0]?.value);

         if (!profile || !profile.emails || !profile.emails[0]) {
            console.error('No email in Google profile');
            return done(new Error('No email provided by Google'), null);
        }

        let user = await db.getOne(
            'SELECT * FROM users WHERE google_id = ?', [profile.id]
        );

        if (!user) {
            user = await db.getOne(
                'SELECT * FROM users WHERE email = ?', [profile.emails[0].value]
            );

            if (user) {
                await db.update(
                    'UPDATE users SET google_id = ? WHERE user_id = ?',[profile.id, user.user_id]
                );
                console.log('Google account linked to existing user:',user.email);
            } else {
                const username = profile.displayName.toLowerCase().replace(/\s/g, '') + '_' + crypto.randomBytes(4).toString('hex');

                const userId = await db.insert(
                    `INSERT INTO users
                    (username, email, first_name, last_name, google_id, is_verified, user_type, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?, TRUE, 'customer', NOW(), NOW())`,
                    [username, profile.emails[0].value, profile.name.givenName, profile.name.familyName, profile.id]
                );
                
                user = await db.getOne('SELECT * FROM users WHERE user_id = ?', [userId]);
                console.log('New user created via Google:', user.email);
            }
        }
        
        return done(null, user);
    } catch (error) {
        console.error('Google Strategy error:', error);
        return done(error, null);
    }    
}));

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getOne('SELECT * FROM users WHERE user_id = ?', [id]);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
console.log('Passport Google Strategy configured');

module.exports = passport;