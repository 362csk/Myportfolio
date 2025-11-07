# Email Setup Instructions

Your contact form now has real email functionality! Follow these steps to enable email sending:

## 1. Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. Go to Google Account > Security > 2-Step Verification
2. Scroll down to "App passwords"
3. Generate a new app password for "Mail"
4. Copy the 16-character password

### Step 3: Configure Environment Variables
Edit the `.env` file and update these values:

```env
# Replace with your Gmail address
EMAIL_USER=your-email@gmail.com

# Replace with the app password from Step 2
EMAIL_PASS=your-16-character-app-password

# Your email where contact form messages will be sent
EMAIL_TO=saikrishnachaithanya17@gmail.com

# Gmail SMTP settings (don't change these)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

## 2. Alternative Email Providers

### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo Mail
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

## 3. Testing

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Fill out contact form on your website
4. Check your email inbox for the message

## 4. Security Notes

- Never commit the `.env` file to version control
- Use app passwords, not your regular email password
- The `.env` file is already in `.gitignore`

## 5. Troubleshooting

**"Authentication failed"**: Check your app password
**"Connection timeout"**: Check SMTP settings
**"535 Authentication failed"**: Enable "Less secure app access" (not recommended) or use app passwords

Your contact form will now send real emails to your inbox!
