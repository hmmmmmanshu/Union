# Quick Start: Supabase Setup for Union

## 📋 What I Need From You

To complete the Supabase setup, please provide the following:

### 1. **Supabase Project Details**
After creating your Supabase project at https://supabase.com/dashboard:

- [ ] **Project URL**: `https://__________.supabase.co`
- [ ] **Project Reference ID**: `__________` (the part before .supabase.co)
- [ ] **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- [ ] **Database Password**: `__________` (the one you set during project creation)

📍 **Where to find these**: 
- Go to your Supabase project
- Click **Settings** → **API**
- All the above are listed there

### 2. **Supabase Access Token**
For Supabase MCP integration:

- [ ] **Access Token**: `sbp_____________________`

📍 **Where to get this**:
1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Name it: "MCP Server - Union"
4. Copy the token (starts with `sbp_`)

---

## 🚀 Setup Steps (After You Provide Credentials)

### Step 1: Create `.env` File
Create a file named `.env` in the project root with:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 2: Update MCP Configuration
Edit `.cursor/mcp.json` and replace:

```json
{
  "mcpServers": {
    "supabase-union": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref",
        "YOUR_PROJECT_REF"    ← Replace this
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_YOUR_TOKEN"    ← Replace this
      },
      "description": "Official Supabase MCP server for Union database access"
    },
    "postgres-direct": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:YOUR_DB_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"    ← Replace YOUR_DB_PASSWORD and YOUR_PROJECT_REF
      ],
      "description": "Direct PostgreSQL connection to Supabase"
    }
  }
}
```

### Step 3: Link Project (Optional)
```bash
npx supabase link --project-ref YOUR_PROJECT_REF
```

### Step 4: Restart Cursor
1. Close Cursor completely
2. Reopen it
3. MCP should now be active!

---

## ✅ Verification

To verify everything works:

1. **Test Environment Variables**:
   - Run the dev server: `npm run dev`
   - Check for any Supabase connection errors in console

2. **Test MCP Connection**:
   - In Cursor, ask Claude: "Show me the database schema"
   - If MCP is working, Claude can interact with your database

3. **Test Supabase Client**:
   ```typescript
   import { supabase } from '@/integrations/supabase/client';
   console.log('Supabase client initialized:', supabase);
   ```

---

## 🗄️ Database Schema Needed

For the Union platform, you'll need these tables:

1. **users** - Worker profiles
   - id, email, name, phone, verified, trust_circle_id, created_at

2. **trust_circles** - Verification groups
   - id, name, description, admin_user_id, created_at

3. **jobs** - Aggregated jobs
   - id, title, description, platform_source, location, price_range, posted_at

4. **bids** - Project bids
   - id, worker_id, project_id, amount, description, status, created_at

5. **transactions** - Financial records
   - id, user_id, type, amount, status, created_at

6. **community_posts** - Forum
   - id, user_id, title, content, category, created_at

7. **reviews** - Worker ratings
   - id, worker_id, reviewer_id, rating, comment, created_at

**Using MCP, you can create these by asking Claude:**
```
"Create a users table with the following schema: 
- id (uuid, primary key)
- email (text, unique)
- name (text)
- phone (text)
- verified (boolean, default false)
- trust_circle_id (uuid, foreign key to trust_circles)
- created_at (timestamp with time zone)"
```

---

## 📝 Template: Fill This Out

```
PROJECT_URL: 
PROJECT_REF: 
ANON_KEY: 
ACCESS_TOKEN: 
DB_PASSWORD: 
```

Once you provide these, I'll help you:
1. ✅ Complete the setup
2. ✅ Create the database schema
3. ✅ Set up Row Level Security (RLS)
4. ✅ Configure authentication
5. ✅ Test the connection

---

## 🔐 Security Reminders

- ✅ `.env` is already in `.gitignore` - won't be committed
- ✅ `.cursor/mcp.json` is already in `.gitignore` - won't be committed
- ❌ **NEVER** share your `service_role` key publicly
- ❌ **NEVER** commit your access tokens to git


