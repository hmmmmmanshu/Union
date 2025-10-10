# Email Verification Redirect URL Configuration

## Issue
After email verification, users are being redirected to `localhost:3000` instead of your production URL (https://union-dkmb.vercel.app).

## Solution

### 1. Update Supabase Auth Settings

Go to your Supabase Dashboard and configure the redirect URLs:

1. Navigate to: [Supabase Auth URL Configuration](https://supabase.com/dashboard/project/xvtodhzrjyxjlvwelfrh/auth/url-configuration)

2. **Update Site URL** to your production URL:
   ```
   https://union-dkmb.vercel.app
   ```

3. **Add Redirect URLs** (one per line):
   ```
   http://localhost:3000/**
   https://union-dkmb.vercel.app/**
   ```

   The `/**` wildcard allows redirects to any path within your domain.

### 2. Environment Variable Setup

Create a `.env` file in your project root (if you haven't already):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xvtodhzrjyxjlvwelfrh.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App URL (Production)
VITE_APP_URL=https://union-dkmb.vercel.app
```

### 3. For Vercel Deployment

Add environment variables in Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add:
   - `VITE_SUPABASE_URL` = `https://xvtodhzrjyxjlvwelfrh.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
   - `VITE_APP_URL` = `https://union-dkmb.vercel.app`

### 4. Email Template Configuration

Make sure your email templates use the correct redirect variables:

**Signup Confirmation Email:**
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your email:</p>
<p>
  <a href="{{ .RedirectTo }}/auth?token_hash={{ .TokenHash }}&type=email">
    Confirm your email
  </a>
</p>
```

**Password Reset Email:**
```html
<h2>Reset your password</h2>
<p>Follow this link to reset your password:</p>
<p>
  <a href="{{ .RedirectTo }}/auth?token_hash={{ .TokenHash }}&type=recovery">
    Reset password
  </a>
</p>
```

### 5. Testing

After making these changes:

1. **Local Development:** 
   - Should redirect to `http://localhost:3000/auth`
   
2. **Production:** 
   - Should redirect to `https://union-dkmb.vercel.app/auth`

## How It Works

1. User signs up → Receives confirmation email
2. Clicks link in email → Redirected to `/auth` with token hash
3. Auth state change triggers → User redirected to onboarding based on their role
4. User completes onboarding → Fully set up!

## Troubleshooting

### Still redirecting to localhost?
- Clear browser cache
- Check Supabase Auth URL Configuration
- Verify environment variables are set correctly in production
- Redeploy your application

### Email not being sent?
- Check Supabase email rate limits (30 emails/hour for free tier)
- Consider setting up custom SMTP for production
- Check spam folder

### Auth token errors?
- Ensure token hasn't expired (valid for 1 hour)
- Verify redirect URLs match exactly (including protocol)

