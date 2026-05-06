const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // The accountType is stored in the token and attached to req.user by protect middleware
        if (!roles.includes(req.user.accountType)) {
            return res.status(403).json({ 
                message: `Access denied. Authorized roles: ${roles.join(", ")}` 
            });
        }
        next();
    };
};

module.exports = { authorizeRoles };
