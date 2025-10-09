# Supabase Setup Guide for Union

This guide will help you set up a new Supabase project and configure Supabase MCP (Model Context Protocol) for the Union platform.

## What is Supabase MCP?

Supabase MCP is a Model Context Protocol server that allows AI assistants (like Claude in Cursor) to directly interact with your Supabase database. It provides:

- **Direct database access** - Query and modify your database through natural language
- **Schema inspection** - Understand your database structure automatically
- **Real-time updates** - Make changes and see them reflected immediately
- **Type safety** - Get proper TypeScript types generated automatically

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. Cursor IDE with MCP support

## Step 1: Create a New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: union-platform (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (~2 minutes)

## Step 2: Get Your Supabase Credentials

Once your project is created, go to **Settings > API**:

1. **Project URL** - Copy this (format: `https://xxxxx.supabase.co`)
2. **Project Ref** - Copy the project reference ID (e.g., `xxxxx`)
3. **anon public** key - Copy this
4. **service_role** key - Copy this (keep it secret!)

## Step 3: Get Your Supabase Access Token

For Supabase MCP, you need a personal access token:

1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Name it: "MCP Server - Union"
4. Copy the token (it starts with `sbp_`)
5. **IMPORTANT**: Save this token securely - you won't see it again!

## Step 4: Configure Environment Variables

Create a `.env` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace:
- `YOUR_PROJECT_REF` with your actual project reference
- `your_supabase_anon_key_here` with your anon public key

## Step 5: Configure Supabase MCP

The `.cursor/mcp.json` file has been created with placeholder values. Update it with your credentials:

```json
{
  "mcpServers": {
    "supabase-union": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref",
        "YOUR_PROJECT_REF_HERE"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN_HERE"
      },
      "description": "Official Supabase MCP server for Union database access"
    },
    "postgres-direct": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:YOUR_PASSWORD_HERE@db.YOUR_PROJECT_REF_HERE.supabase.co:5432/postgres"
      ],
      "description": "Direct PostgreSQL connection to Supabase"
    }
  }
}
```

Replace:
- **YOUR_PROJECT_REF_HERE** - Your Supabase project reference ID
- **YOUR_ACCESS_TOKEN_HERE** - Your Supabase personal access token (starts with `sbp_`)
- **YOUR_PASSWORD_HERE** - Your database password from Step 1
- **YOUR_PROJECT_REF_HERE** - Your project reference (again, for the connection string)

## Step 6: Link Your Supabase Project (Optional)

If you want to use Supabase CLI for local development:

```bash
# Install Supabase CLI globally
npm install -g supabase

# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref YOUR_PROJECT_REF
```

This will update `supabase/config.toml` with your project ID.

## Step 7: Generate TypeScript Types

After creating your database schema in Supabase, generate TypeScript types:

```bash
# Generate types
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/integrations/supabase/types.ts
```

Or if you've linked your project:

```bash
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

## Step 8: Restart Cursor

After configuring MCP:

1. Close Cursor completely
2. Reopen Cursor
3. Open your project
4. The MCP server should now be active

You can verify it's working by asking Claude to "show me the database schema" or "list all tables".

## Step 9: Test the Connection

Create a test component or use the existing Supabase client:

```typescript
import { supabase } from '@/integrations/supabase/client';

// Test the connection
const testConnection = async () => {
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('Connection error:', error);
  } else {
    console.log('Connected successfully!', data);
  }
};
```

## Database Schema for Union

You'll need to create tables for:

1. **users** - Worker profiles
2. **trust_circles** - Worker verification groups
3. **jobs** - Job aggregation data
4. **bids** - Project bidding system
5. **transactions** - Financial records
6. **community_posts** - Forum content
7. **reviews** - Worker ratings

Use Supabase MCP to create these tables by asking Claude:
"Create a users table with fields for name, email, phone, verified status, and trust circle ID"

## Security Notes

⚠️ **NEVER commit these files:**
- `.env` - Contains your API keys
- `.cursor/mcp.json` - May contain access tokens

✅ **Add to .gitignore:**
```
.env
.env.local
.cursor/mcp.json
```

## Useful Supabase MCP Commands

Once MCP is set up, you can use natural language with Claude:

- "Show me all tables in the database"
- "Create a new table called workers with these fields..."
- "Add a column to the users table"
- "What's the schema for the jobs table?"
- "Insert sample data into the trust_circles table"
- "Update all users where verified is false"

## Troubleshooting

### MCP Server Not Starting
- Check that all credentials in `.cursor/mcp.json` are correct
- Ensure your Supabase access token is valid
- Restart Cursor completely

### Connection Errors
- Verify your `.env` file has the correct values
- Check that your Supabase project is active
- Ensure your IP is not blocked (check Supabase dashboard)

### Type Generation Fails
- Make sure Supabase CLI is installed
- Verify your project is linked correctly
- Check that you have tables in your database

## Next Steps

1. Create your database schema using Supabase MCP
2. Set up Row Level Security (RLS) policies
3. Configure authentication providers
4. Set up storage buckets for file uploads
5. Create database functions for complex operations

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase MCP GitHub](https://github.com/supabase/mcp-server-supabase)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Union Project Structure](./README.md)


