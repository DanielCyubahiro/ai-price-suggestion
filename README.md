# 🛍️ Trendies - Luxury Second-Hand Moroccan Marketplace 🇲🇦✨

## 📜 Description
This is a feature to be integrated with Trendies, a platform designed as a marketplace for luxury second-hand items, with a special focus on products of Moroccan origin. This feature allows users to list their items for sale and uses an AI-powered price suggestion feature to help sellers determine a fair market price. The AI considers various factors, including item details, market trends, rarity, and condition, to provide a realistic price estimate.

## 🚀 Features

* **User Authentication** 🔐: Secure sign-up and sign-in functionality using NextAuth.js with Google Provider.
* **Create Listings** 📝: Authenticated users can create new listings for their luxury items by providing details such as title, description, brand, category, condition, and price.
* **View Listings** 📄: Authenticated users can view a table of their created listings, showing title, category, brand, condition, and price.
* **AI Price Suggestion** 🤖💰: An AI-powered feature that suggests a fair market price for an item based on its details. his feature leverages the Google Gemini API, specialized in pricing vintage luxury second-hand items, especially those of Moroccan origin.
* **Form Validation** ✅: Ensures that listing submissions meet specific criteria using Zod for schema validation.
* **Toast Notifications** 📢: Provides user feedback for actions like successful listing creation or errors using a custom toast component.
* **Responsive Design** 📱💻: Styled with Tailwind CSS for a modern and responsive user interface.
* **Protected Routes**: Middleware ensures that only authenticated users can access certain routes, like the new listing page.
* **Customizable UI Components**: Used Shadcn/ui for UI components like Buttons, Cards, Forms, Inputs, etc.
* **Redirect for Unauthenticated Users**: Users attempting to access protected pages without being logged in are redirected to the sign-in page.

## 🏁 Getting Started

### Prerequisites

* Node.js (v18.18.0 or later)
* npm, yarn, pnpm, or bun
* A PostgreSQL database (or any other database compatible with Prisma)
* Google Cloud Platform project with OAuth credentials
* Gemini API Key

### Setup Instructions

1.  **Clone the repository:** हू

    ```bash
    git clone https://github.com/danielcyubahiro/ai-price-suggestion.git
    cd ai-price-suggestion
    ```

2.  **Install dependencies:** 📦
    Choose your preferred package manager:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up environment variables:** ⚙️
    Create a `.env.local` file in the root of the project and add the following environment variables:

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # NextAuth.js
    NEXTAUTH_URL="http://localhost:3000" # Replace with your domain in production
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET" # Generate a strong secret: openssl rand -hex 32

    # Google Provider (NextAuth.js)
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

    # Gemini API
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

    * Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL connection details.
    * Generate a `NEXTAUTH_SECRET`.
    * Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from your Google Cloud Platform project.
    * Obtain your `GEMINI_API_KEY` from Google AI Studio or Google Cloud Console.

4.  **Set up the database:** 🗄️
    Run Prisma migrations to set up your database schema:

    ```bash
    npx prisma migrate dev --name init
    ```

    This will also generate the Prisma Client. If you need to generate it manually later, you can use:

    ```bash
    npx prisma generate
    ```

    *Note: The `postinstall` script in `package.json` also runs `prisma generate`.*

5.  **Run the development server:** ▶️

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

6.  **Open your browser:** 🌐
    Navigate to http://localhost:3000 to see the application.

## 🏗️ Project Structure

* `app/`: Contains the core application logic, including pages, layouts, and server actions.
    * `actions/`: Server-side actions (e.g., `listingActions.ts` for creating listings and suggesting prices).
    * `api/`: API routes (e.g., NextAuth.js authentication routes).
    * `listings/new/`: Page for creating a new listing.
    * `layout.tsx`: Root layout of the application.
    * `page.tsx`: Homepage of the application.
    * `globals.css`: Global CSS styles.
* `auth.ts`: Configuration for NextAuth.js.
* `components/`: Reusable React components.
    * `ui/`: UI components like Button, Card, Form, Input, etc., likely from a UI library like Shadcn/ui.
    * `AuthProvider.tsx`: Provides session context for NextAuth.js.
    * `Header.tsx`: Application header component.
    * `ListingForm.tsx`: Form for creating new listings.
    * `ListingsTable.tsx`: Component to display user's listings.
    * `Buttons/`: Contains various button components like `AddItemButton.tsx`, `SignInButton.tsx` / `SignOutButton.tsx`.
* `hooks/`: Custom React hooks (e.g., `use-toast.ts` for notifications).
* `lib/`: Utility functions and library configurations.
    * `prisma.ts`: Prisma client instance.
    * `utils.ts`: Utility functions like `cn` for classnames and `getEnvVariable`.
    * `validators.ts`: Zod schemas for form validation (e.g., `listingSchema`).
* `middlewares/`: Custom middleware (e.g., `auth.middleware.ts` for protecting routes).
* `prisma/`: Contains the Prisma schema file (`schema.prisma`) for database modeling.
* `public/`: Static assets.
* Configuration Files: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `components.json`, `eslint.config.mjs`, `package.json`.

## 🌱 Future Improvements

* **Image Uploads for Listings** 🖼️: Implement functionality for users to upload images for their items. This would likely involve integrating a cloud storage solution (e.g., Cloudinary, AWS S3).
* **Enhanced AI Price Suggestion** 🧠:
    * Allow the AI to consider image data for more accurate pricing.
    * Provide more detailed feedback on why a certain price was suggested (e.g., based on specific market comparables).
    * Fine-tune the AI model further with more specific data on Moroccan luxury items if available.
* **Comprehensive Testing** 🧪: Implement unit, integration, and end-to-end tests to ensure application reliability and stability (e.g., using Jest, React Testing Library, Cypress/Playwright).
* **Internationalization (i18n)** 🌍: Support for multiple languages, especially French and Arabic, given the Moroccan focus.
* **Browse and Search Listings** 🔍: Develop features for users to browse, filter, and search existing listings.
* **Detailed Listing Pages** 📖: Individual pages for each listing with more detailed information and images.
* **Edit and Delete Listings** ✏️🗑️: Enable users to modify or remove their existing listings.
* **Pagination for Listings** 🔢: Implement pagination for the listings table if the number of listings becomes large.
* **More Authentication Providers** 🔑: Add other OAuth providers or email/password authentication.
