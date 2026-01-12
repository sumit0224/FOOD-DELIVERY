const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for OTP requests
 * Limit: 10 requests per 1 minute per IP (temporarily increased for testing)
 * Prevents OTP spam and abuse
 */
const otpRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute (temporary for testing)
    max: 10, // 10 requests per minute (temporary for testing)
    message: {
        success: false,
        message: 'Too many OTP requests. Please try again after 15 minutes.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many OTP requests from this IP. Please try again after 15 minutes.',
            retryAfter: '15 minutes',
        });
    },
});

/**
 * Rate limiter for cart operations
 * Limit: 100 requests per 15 minutes per IP
 * Prevents cart manipulation abuse
 */
const cartRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many cart requests. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many cart operations. Please slow down.',
            retryAfter: 'Please wait a few minutes',
        });
    },
});

/**
 * General API rate limiter
 * Limit: 200 requests per 15 minutes per IP
 */
const generalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    otpRateLimit,
    cartRateLimit,
    generalRateLimit,
};
