const jwt = require('jsonwebtoken');

// Middleware kiểm tra JWT
export function authenticateJWT(req: any, res: any, next: any) {
    const token = req.header('Authorization');
    console.log("token: " + token);
    try {
        if (!token) {
            throw new Error('Invalid token')
            // return res.status(401).json({ message: 'Không có JWT' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
                console.log(err);

                throw new Error('Invalid token')
                // return res.status(403).json({ message: 'JWT không hợp lệ' });
            }
            req.user = user;
            console.log(user);
            
            next();
        });
    } catch (error: any) {
        next(error);
    }
}
