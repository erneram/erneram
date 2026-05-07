# EmailJS Configuration Guide

## ⚙️ Setting up EmailJS

Your contact form is now integrated with VeeValidate for validation and EmailJS for sending emails. To make it work, you need to configure EmailJS:

### 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### 2. Set up Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy the **Service ID**

### 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```html
Subject: New Contact from Portfolio - {{from_name}}

Hi {{to_name}},

You have a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Copy the **Template ID**

### 4. Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Configure Environment Variables

Create a `.env` file in your project root:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important:** Replace the placeholder values with your actual EmailJS credentials.

### 6. Template Variables Used

The form sends these variables to your EmailJS template:

- `{{from_name}}` - First name + Last name
- `{{from_email}}` - User's email
- `{{phone_number}}` - User's phone number  
- `{{message}}` - User's message
- `{{to_name}}` - Your name (hardcoded as "Ernesto Ascencio")
- `{{reply_to}}` - User's email for easy reply

### 7. Testing

1. Restart your development server after adding environment variables
2. Fill out the contact form
3. Check your email for the message
4. Verify the validation works by submitting invalid data

## 🛡️ Form Validation

The form includes comprehensive validation using VeeValidate and Yup:

### Validation Rules

- **First Name**: Required, 2-50 characters, letters only
- **Last Name**: Required, 2-50 characters, letters only  
- **Email**: Required, valid email format, max 100 characters
- **Phone**: Required, valid phone format, 10-17 digits
- **Message**: Required, 10-1000 characters

### Features

- ✅ Real-time validation feedback
- ✅ Error messages in English and Spanish
- ✅ Visual error indicators (red borders)
- ✅ Submit button disabled until form is valid
- ✅ Loading state during submission
- ✅ Success/error notifications
- ✅ Form reset after successful submission

## 📁 Architecture

The implementation follows Clean Architecture principles:

```
src/
├── types/              # Domain types & interfaces
├── schemas/            # Validation schemas (Yup)
├── services/           # External services (EmailJS)
├── composables/        # Business logic (useContactForm)
└── components/         # UI components (FormContactMe)
```

### Key Files

- `src/schemas/contactFormSchema.ts` - Yup validation schema
- `src/services/emailService.ts` - EmailJS integration
- `src/composables/useContactForm.ts` - Form logic & validation
- `src/components/contact/FormContactMe.vue` - UI component

## 🔒 Security Notes

- Environment variables are used for EmailJS configuration
- Never commit `.env` file to version control
- Add `.env` to `.gitignore`
- EmailJS public key is safe to expose in frontend
- Consider rate limiting for production use

## 🚀 Deployment

For production deployment:

1. Set environment variables in your hosting platform
2. Ensure EmailJS domain is allowlisted in your service settings
3. Test the form thoroughly in production environment
4. Monitor EmailJS usage limits

## 💡 Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify EmailJS configuration
- Ensure all required fields are filled

### Emails not received
- Check spam/junk folders
- Verify EmailJS template and service setup
- Check EmailJS dashboard for delivery logs

### Validation errors
- Ensure all fields meet validation requirements
- Check console for detailed error messages
