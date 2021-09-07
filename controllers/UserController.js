const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.Login = (req, res, next) => {
    User.getUserByEmail({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            if (req.body.password === user.password) {
                const token = jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' });
                res.status(200).json({
                    userId: user._id,
                    token: token
                });
            } else {
                return res.status(401).json({
                    error: new Error('Incorrect password!')
                });
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
}