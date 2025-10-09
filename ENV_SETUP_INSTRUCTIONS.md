# Environment Setup - COMPLETE THIS NOW

## Create `.env` File

Create a file named `.env` in your project root (`C:\Users\DELL\Desktop\home-union-india-main\`) with the following content:

```env
VITE_SUPABASE_URL=https://xvtodhzrjyxjlvwelfrh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dG9kaHpyanl4amx2d2VsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDEzODYsImV4cCI6MjA3NTQ3NzM4Nn0.0qcMEvH5zcxDSmDM0yV_XcgdIjaYhmzVXjU18j0bIQw
```

## How to Create the File

### Option 1: Using Cursor
1. In Cursor, click File → New File
2. Paste the content above
3. Save as `.env` in the project root
4. Make sure there are NO extra spaces or quotes

### Option 2: Using Command Line
```bash
cd C:\Users\DELL\Desktop\home-union-india-main
echo VITE_SUPABASE_URL=https://xvtodhzrjyxjlvwelfrh.supabase.co > .env
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dG9kaHpyanl4amx2d2VsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDEzODYsImV4cCI6MjA3NTQ3NzM4Nn0.0qcMEvH5zcxDSmDM0yV_XcgdIjaYhmzVXjU18j0bIQw >> .env
```

## After Creating .env

1. Save the file
2. Restart your dev server (stop with Ctrl+C, then run `npm run dev`)
3. Your app should now connect to Supabase!

## Security Note

This file is already in .gitignore and will NOT be committed to version control. Keep it safe!

