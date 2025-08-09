# Railway Deployment Setup

## IMPORTANT: You MUST add PostgreSQL database first!

### Step 1: Add PostgreSQL Database BEFORE deploying

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Click on your project (or create new project)
3. Click "New" → "Database" → "Add PostgreSQL"
4. Wait for PostgreSQL to deploy (this creates the `DATABASE_URL` automatically)

### Step 2: Connect and Deploy

1. Connect your GitHub repository to Railway
2. Railway will automatically detect Next.js and build
3. The app will start once PostgreSQL is connected

### Step 3: Verify Database Connection

Check your Railway logs - you should see:
- ✅ `Database initialized successfully` 
- ❌ NOT `DATABASE_URL not found`

## Step 3: Verify

Your app should now work at the Railway URL. The analytics will:
- Show fallback data if database isn't connected yet
- Automatically create tables on first analytics request
- Work normally once PostgreSQL is connected

## Environment Variables

Railway automatically provides:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production` - Environment setting

## Dashboard Access

Visit `/dashboard` and enter password: `zmakqo0202`

## Troubleshooting

If you see connection errors:
1. Verify PostgreSQL database is added to your Railway project
2. Check that `DATABASE_URL` environment variable is set
3. The app will work with fallback data if database isn't available

## Local Development

For local development, either:
1. Use the fallback data (no database setup needed)
2. Or set up local PostgreSQL and add `DATABASE_URL` to `.env.local`