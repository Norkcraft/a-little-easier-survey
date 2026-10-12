# A little easier — survey

A mobile-friendly, one-question-at-a-time product-discovery survey. Six questions, an optional contact opt-in, animated transitions with reduced-motion support, back navigation, and native / WhatsApp sharing.

## Deploy on Vercel

Create a Git repository containing the files in this folder, then import it into Vercel. Choose **Other** as the framework. Leave build command and output directory at their defaults. There are no dependencies to install and no environment variables to configure.

Alternatively, with the Vercel CLI signed in to the intended account, run `vercel --prod` from this folder and choose the intended project.

The Node function in `api/[endpoint].js` securely forwards anonymous submissions to the existing survey backend. Keep the existing ChatGPT Site active; it stores responses and hosts the private dashboard. This package does not migrate storage.

Admin dashboard: https://everyday-friction-survey.usmanmuhammad6565772.chatgpt.site/admin

Only the owner signs in to the dashboard. Survey participants never create an account. The Vercel project must allow public production access for sharing with friends.

The proxy forwards only the survey session cookie and enforces same-origin POST requests. It does not expose the owner account or grant access to responses. Retrying the same submission is deduplicated by the backend.

## Status

Frontend JavaScript syntax and local backend submission checks passed. Vercel publication was blocked because the connected account did not have permission to create a project. The Vercel proxy still requires a live deployment check after that access is resolved.
