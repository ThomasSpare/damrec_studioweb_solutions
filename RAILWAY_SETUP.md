# Railway Deployment Setup

## Step 1: Add PostgreSQL Database

1. Go to your Railway dashboard
2. Click on your project
3. Click "New" → "Database" → "Add PostgreSQL"
4. Railway will automatically create the database and set the `DATABASE_URL` environment variable

## Step 2: Deploy

1. Push your code to GitHub
2. Connect your GitHub repo to Railway
3. Railway will automatically build and deploy your app

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