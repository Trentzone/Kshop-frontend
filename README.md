# KShop Frontend

This is the frontend application for the KShop student e-commerce platform, built with Next.js and Tailwind CSS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Features

- User registration and login
- Product browsing and search
- Product details and images
- Shopping cart and checkout
- Payment integration with Paystack

## Environment Variables

Create a `.env.local` file in the root with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Scripts

- `dev`: Runs the app in development mode
- `build`: Builds the app for production
- `start`: Runs the production build

## License

MIT
