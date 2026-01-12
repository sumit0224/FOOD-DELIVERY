const nodemailer = require('nodemailer');

/**
 * Email Service for sending transactional emails
 * Currently configured for Gmail SMTP
 */

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

/**
 * Send OTP email for password reset
 * @param {string} email - Recipient email address
 * @param {string} otp - 6-digit OTP
 * @returns {Promise<boolean>} - Success status
 */
const sendOtpEmail = async (email, otp) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"Food Delivery" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF5200 0%, #e64a00 100%); 
                      color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #FF5200; padding: 20px; 
                       text-align: center; font-size: 32px; font-weight: bold; 
                       letter-spacing: 8px; margin: 20px 0; border-radius: 8px; color: #FF5200; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You requested to reset your password. Use the OTP below to proceed:</p>
              
              <div class="otp-box">${otp}</div>
              
              <div class="warning">
                <strong>⚠️ Important:</strong> This OTP is valid for <strong>10 minutes only</strong>.
              </div>
              
              <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
              
              <p>Best regards,<br><strong>Food Delivery Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `
        Password Reset OTP
        
        Hello,
        
        You requested to reset your password. Use the OTP below to proceed:
        
        OTP: ${otp}
        
        ⚠️ Important: This OTP is valid for 10 minutes only.
        
        If you didn't request this password reset, please ignore this email.
        
        Best regards,
        Food Delivery Team
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ OTP email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

/**
 * Send order notification to admin
 * @param {object} order - Complete order object with user and items
 * @returns {Promise<boolean>} - Success status
 */
const sendOrderNotificationToAdmin = async (order) => {
    try {
        const transporter = createTransporter();

        // Format order items for email
        const itemsList = order.orderItems.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">₹${item.price * item.quantity}</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: `"Food Delivery" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to admin email
            subject: `🎉 New Order Received - #${order._id.toString().slice(-6)}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF5200 0%, #e64a00 100%); 
                      color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; 
                        border-bottom: 1px solid #f0f0f0; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
            .items-table { width: 100%; margin: 20px 0; border-collapse: collapse; }
            .items-table th { background: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; }
            .total { background: #FFF3E0; padding: 15px; margin: 20px 0; text-align: right; 
                     font-size: 20px; font-weight: bold; border-radius: 8px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .badge { display: inline-block; padding: 5px 15px; border-radius: 20px; 
                     background: #FF5200; color: white; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Order Received!</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Order #${order._id.toString().slice(-6)}</p>
            </div>
            <div class="content">
              <h2 style="color: #FF5200; margin-top: 0;">Customer Information</h2>
              <div class="info-row">
                <span class="label">👤 Name:</span>
                <span class="value">${order.user?.name || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">${order.user?.email || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Phone:</span>
                <span class="value">${order.user?.phone || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">📍 Address:</span>
                <span class="value">${order.shippingAddress?.address || 'N/A'}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postalCode || ''}</span>
              </div>

              <h2 style="color: #FF5200; margin-top: 30px;">Order Details</h2>
              <div class="info-row">
                <span class="label">🕒 Placed At:</span>
                <span class="value">${new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div class="info-row">
                <span class="label">💳 Payment Method:</span>
                <span class="value">${order.paymentMethod || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">📊 Status:</span>
                <span class="value"><span class="badge">${order.status}</span></span>
              </div>

              <h2 style="color: #FF5200; margin-top: 30px;">Ordered Items</h2>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
              </table>

              <div class="total">
                Total Amount: <span style="color: #FF5200;">₹${order.itemsPrice}</span>
              </div>

              <p style="text-align: center; margin-top: 30px;">
                <a href="http://localhost:5173/admin/orders" 
                   style="background: #FF5200; color: white; padding: 12px 30px; text-decoration: none; 
                          border-radius: 8px; display: inline-block; font-weight: bold;">
                  View in Admin Panel
                </a>
              </p>
            </div>
            <div class="footer">
              <p>This is an automated notification from your Food Delivery system.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `
        New Order Received!
        
        Order ID: #${order._id.toString().slice(-6)}
        
        === Customer Information ===
        Name: ${order.user?.name || 'N/A'}
        Email: ${order.user?.email || 'N/A'}
        Phone: ${order.user?.phone || 'N/A'}
        Address: ${order.shippingAddress?.address || 'N/A'}
        
        === Order Details ===
        Placed At: ${new Date(order.createdAt).toLocaleString()}
        Payment Method: ${order.paymentMethod || 'N/A'}
        Status: ${order.status}
        
        === Items ===
        ${order.orderItems.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}
        
        Total Amount: ₹${order.itemsPrice}
        
        View in Admin Panel: http://localhost:5173/admin/orders
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Admin order notification sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        // Don't throw error to prevent order creation failure
        return false;
    }
};

/**
 * Send order cancellation email to user
 * @param {string} userEmail - User's email address
 * @param {object} data - {orderId, cancelledBy, cancelReason, userName}
 * @returns {Promise<boolean>} - Success status
 */
const sendOrderCancelledEmail = async (userEmail, data) => {
    try {
        const transporter = createTransporter();

        const { orderId, cancelledBy, cancelReason, userName } = data;

        const mailOptions = {
            from: `"Food Delivery" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `⚠️ Order Cancelled - #${orderId.toString().slice(-6)}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
                      color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .warning-box { background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; 
                           margin: 20px 0; border-radius: 4px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; 
                        border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .button { background: #FF5200; color: white; padding: 12px 30px; text-decoration: none; 
                      border-radius: 8px; display: inline-block; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Order Cancelled</h1>
            </div>
            <div class="content">
              <p>Hello ${userName || 'Customer'},</p>
              
              <div class="warning-box">
                <strong>Your order has been cancelled.</strong>
              </div>

              <div class="info-box">
                <p><strong>Order ID:</strong> #${orderId.toString().slice(-6)}</p>
                <p><strong>Cancelled By:</strong> ${cancelledBy}</p>
                ${cancelReason ? `<p><strong>Reason:</strong> ${cancelReason}</p>` : ''}
                <p><strong>Cancelled At:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p>We apologize for any inconvenience this may have caused.</p>
              
              ${cancelledBy === 'Admin' ? `
              <p><strong>Refund Information:</strong><br>
              If you have already made a payment, a full refund will be processed within 5-7 business days to your original payment method.</p>
              ` : ''}

              <p>If you have any questions or concerns, please don't hesitate to contact our customer support.</p>

              <p style="text-align: center;">
                <a href="http://localhost:5173/contact" class="button">Contact Support</a>
              </p>

              <p>Best regards,<br><strong>Food Delivery Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `
        Order Cancelled
        
        Hello ${userName || 'Customer'},
        
        Your order has been cancelled.
        
        Order ID: #${orderId.toString().slice(-6)}
        Cancelled By: ${cancelledBy}
        ${cancelReason ? `Reason: ${cancelReason}` : ''}
        Cancelled At: ${new Date().toLocaleString()}
        
        We apologize for any inconvenience this may have caused.
        
        ${cancelledBy === 'Admin' ? 'If you have already made a payment, a full refund will be processed within 5-7 business days.' : ''}
        
        If you have any questions, please contact our customer support.
        
        Best regards,
        Food Delivery Team
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Cancellation email sent to user:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending cancellation email:', error);
        return false;
    }
};

module.exports = {
    sendOtpEmail,
    sendOrderNotificationToAdmin,
    sendOrderCancelledEmail,
};
