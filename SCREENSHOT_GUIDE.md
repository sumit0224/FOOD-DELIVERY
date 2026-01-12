# 📸 Screenshot Guide for README.md

This guide explains which screenshots to capture and where to place them for the README.md file.

---

## 📁 Directory Structure

Create a `screenshots` folder in the root directory:

```
FOOD-DELIVERY/
├── screenshots/              # Create this folder
│   ├── home_page.png
│   ├── menu_page.png
│   ├── cart_page.png
│   ├── checkout_page.png
│   ├── user_dashboard.png
│   ├── forgot_password.png
│   ├── admin_login.png
│   ├── admin_dashboard.png
│   ├── admin_orders_desktop.png
│   ├── admin_orders_mobile.png
│   ├── admin_products.png
│   ├── admin_users.png
│   ├── admin_email.png
│   └── cancellation_email.png
├── README.md
├── Backend/
└── Frontend/
```

---

## 📷 Screenshots to Capture

### Customer-Facing Pages

#### 1. **Home Page** (`home_page.png`)
- **URL**: `http://localhost:5173/`
- **Capture**: Full page with hero section and featured products
- **Resolution**: 1920x1080 (Full HD)
- **Features to show**:
  - Navigation bar
  - Hero section
  - Product categories
  - Footer

#### 2. **Menu Page** (`menu_page.png`)
- **URL**: `http://localhost:5173/menu`
- **Capture**: Product grid with images
- **Resolution**: 1920x1080
- **Features to show**:
  - All food items
  - Product cards with images
  - Add to cart buttons
  - Search/filter (if visible)

#### 3. **Cart Page** (`cart_page.png`)
- **URL**: `http://localhost:5173/cart`
- **Capture**: Cart with items added
- **Resolution**: 1920x1080
- **Features to show**:
  - Cart items list
  - Quantity controls
  - Remove buttons
  - Total price
  - Proceed to checkout button

#### 4. **Checkout Page** (`checkout_page.png`)
- **URL**: `http://localhost:5173/checkout`
- **Capture**: Checkout form
- **Resolution**: 1920x1080
- **Features to show**:
  - Shipping address form
  - Payment method selection
  - Order summary
  - Place order button

#### 5. **User Dashboard** (`user_dashboard.png`)
- **URL**: `http://localhost:5173/dashboard`
- **Capture**: Dashboard with orders
- **Resolution**: 1920x1080
- **Features to show**:
  - Order list
  - Order status badges
  - User profile section
  - Order details

#### 6. **Forgot Password Flow** (`forgot_password.png`)
- **URL**: `http://localhost:5173/forgot-password`
- **Capture**: All 3-4 steps in a collage or use carousel
- **Resolution**: 1920x1080
- **Steps to capture**:
  - Step 1: Email input
  - Step 2: OTP verification
  - Step 3: New password
  - Step 4: Success message

---

### Admin Pages

#### 7. **Admin Login** (`admin_login.png`)
- **URL**: `http://localhost:5173/admin`
- **Capture**: Clean admin login page
- **Resolution**: 1920x1080
- **Features to show**:
  - Login form
  - Branding
  - No signup link (security feature)

#### 8. **Admin Dashboard** (`admin_dashboard.png`)
- **URL**: `http://localhost:5173/admin/dashboard`
- **Capture**: Dashboard overview
- **Resolution**: 1920x1080
- **Features to show**:
  - Statistics cards
  - Charts/graphs (if any)
  - Quick actions
  - Navigation sidebar

#### 9. **Order Management - Desktop** (`admin_orders_desktop.png`)
- **URL**: `http://localhost:5173/admin/orders`
- **Capture**: Full desktop view with expanded order details
- **Resolution**: 1920x1080
- **Features to show**:
  - Order table
  - Status badges
  - Expandable order details
  - Search bar
  - Status update dropdown
  - View Details button

#### 10. **Order Management - Mobile** (`admin_orders_mobile.png`)
- **URL**: `http://localhost:5173/admin/orders`
- **Capture**: Mobile view (use browser DevTools mobile emulation)
- **Resolution**: 375x812 (iPhone X size)
- **Features to show**:
  - Order cards layout
  - Mobile hamburger menu
  - Responsive order details
  - Status update on mobile

#### 11. **Product Management** (`admin_products.png`)
- **URL**: `http://localhost:5173/admin/products`
- **Capture**: Product management page
- **Resolution**: 1920x1080
- **Features to show**:
  - Product list
  - Add/Edit/Delete buttons
  - Product details
  - Search functionality

#### 12. **User Management** (`admin_users.png`)
- **URL**: `http://localhost:5173/admin/users`
- **Capture**: Users list
- **Resolution**: 1920x1080
- **Features to show**:
  - Users table
  - User information
  - Search functionality

---

### Email Screenshots

#### 13. **Admin Order Notification** (`admin_email.png`)
- **Source**: Your email inbox
- **Capture**: Screenshot of the email received by admin
- **Features to show**:
  - HTML email template
  - Order details table
  - Customer information
  - Professional design

#### 14. **User Cancellation Email** (`cancellation_email.png`)
- **Source**: Your email inbox (send test to yourself)
- **Capture**: Cancellation email sent to user
- **Features to show**:
  - Cancellation notice
  - Order ID
  - Reason
  - Refund information
  - Contact support button

---

## 🎨 Screenshot Best Practices

### Tools to Use
- **Windows**: `Win + Shift + S` (Snipping Tool)
- **Mac**: `Cmd + Shift + 4`
- **Chrome Extension**: [Awesome Screenshot](https://www.awesomescreenshot.com/)
- **Full Page**: [GoFullPage](https://gofullpage.com/)

### Capture Guidelines
1. **Clean Data**: Use realistic but clean test data
2. **Full Resolution**: Capture in full HD (1920x1080) for desktop
3. **Mobile Screenshots**: Use DevTools (F12) → Toggle Device Toolbar
4. **No Sensitive Data**: Don't include real emails/passwords/tokens
5. **Consistent Branding**: Use same test products/users across screenshots
6. **Light/Dark Mode**: Capture in light mode for consistency

### Image Optimization
```bash
# Install ImageMagick (optional, for compression)
# Windows: choco install imagemagick
# Mac: brew install imagemagick

# Compress PNG (optional)
magick convert input.png -quality 85 -strip output.png
```

---

## 📝 Quick Capture Script (Windows PowerShell)

Save as `capture_screenshots.ps1`:

```powershell
# Create screenshots directory
New-Item -ItemType Directory -Force -Path "screenshots"

Write-Host "🎯 Screenshot Capture Guide"
Write-Host "===========================`n"

$screenshots = @(
    @{ Name = "home_page.png"; URL = "http://localhost:5173/" },
    @{ Name = "menu_page.png"; URL = "http://localhost:5173/menu" },
    @{ Name = "cart_page.png"; URL = "http://localhost:5173/cart" },
    @{ Name = "checkout_page.png"; URL = "http://localhost:5173/checkout" },
    @{ Name = "user_dashboard.png"; URL = "http://localhost:5173/dashboard" },
    @{ Name = "forgot_password.png"; URL = "http://localhost:5173/forgot-password" },
    @{ Name = "admin_login.png"; URL = "http://localhost:5173/admin" },
    @{ Name = "admin_dashboard.png"; URL = "http://localhost:5173/admin/dashboard" },
    @{ Name = "admin_orders_desktop.png"; URL = "http://localhost:5173/admin/orders" },
    @{ Name = "admin_products.png"; URL = "http://localhost:5173/admin/products" },
    @{ Name = "admin_users.png"; URL = "http://localhost:5173/admin/users" }
)

foreach ($screenshot in $screenshots) {
    Write-Host "[  ] $($screenshot.Name)" -ForegroundColor Yellow
    Write-Host "     URL: $($screenshot.URL)" -ForegroundColor Gray
    Start-Process $screenshot.URL
    Write-Host "     Press Enter after capturing..." -ForegroundColor Cyan
    Read-Host
}

Write-Host "`n✅ All screenshots captured!" -ForegroundColor Green
Write-Host "📧 Don't forget to capture email screenshots manually!" -ForegroundColor Yellow
```

Run with:
```powershell
.\capture_screenshots.ps1
```

---

## 🚀 After Taking Screenshots

1. **Verify all files exist** in `screenshots/` folder
2. **Check file sizes** (should be < 500KB each for GitHub)
3. **Test README rendering** on GitHub
4. **Commit screenshots** to repository:
   ```bash
   git add screenshots/
   git commit -m "Add project screenshots"
   git push
   ```

---

## 📌 Alternative: Use Placeholder Images

If you want to create this README before taking screenshots, the current README uses placeholder image URLs. They will be automatically replaced once you add real screenshots to the `screenshots/` folder.

Current placeholders in README:
```markdown
![Home Page](screenshots/home_page.png)
```

These will automatically work once you add the files!

---

## 🎯 Priority Screenshots

If you're short on time, capture these **essential** screenshots first:

1. ✅ Home Page
2. ✅ Admin Orders (Desktop)
3. ✅ Admin Orders (Mobile)
4. ✅ User Dashboard
5. ✅ Admin Email Notification

---

## 💡 Pro Tips

- **Use Dummy Data**: Create sample products like "Margherita Pizza", "Burger", etc.
- **Consistent User**: Use the same test user (e.g., "John Doe") across screenshots
- **Mock Orders**: Create 2-3 test orders with different statuses
- **Professional Look**: Clear desktop, close unnecessary browser tabs
- **Zoom Level**: Use 100% zoom in browser for consistency

---

Happy Screenshotting! 📸✨
