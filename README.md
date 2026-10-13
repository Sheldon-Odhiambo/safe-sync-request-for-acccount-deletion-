# SafeSync Account Deletion Request

**SafeSync Technologies Ltd.**  
*Every second matters. Every life counts.*

A dedicated web page that allows SafeSync users to submit requests to delete their accounts. The page is intended to be deployed on a separate subdomain, independent of the main SafeSync website.

## Project Overview

The Account Deletion Request page provides users with a clear way to request the deletion of their SafeSync accounts and associated personal data, subject to applicable legal and operational requirements.

### Key Features

- Account deletion request form.
- User identity verification.
- Clear confirmation after submission.
- Secure handling of deletion requests.
- Information about account deletion and data retention.
- Separate subdomain deployment.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git (optional, for version control)

### Installation

1. Clone the repository or open the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the required environment variables in your local environment file, if applicable.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal to view the application.

## Environment Variables

Store sensitive configuration values in environment variables rather than hardcoding them in your source code.

For example, if your application requires a backend API URL:

```env
VITE_API_BASE_URL=your_backend_api_url
```

Use the environment variable naming convention appropriate to your framework. Never commit API secrets, access tokens, or private keys to GitHub.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

These commands assume the corresponding scripts are defined in `package.json`.

## Deployment

The application is intended to be deployed independently from the main SafeSync website.

Example proposed URL:

`https://account.safesync.co.ke/delete-account`

Deployment requirements:

1. Deploy the web application to the selected hosting provider.
2. Configure the `account.safesync.co.ke` subdomain through your DNS and hosting settings.
3. Enable HTTPS.
4. Configure the backend endpoint responsible for processing deletion requests.
5. Test the request form, identity verification, confirmation messages, and deletion workflow.

The proposed URL will only work after the subdomain and deployment have been configured.

## Security and Privacy

- Verify that the person submitting a request is authorized to delete the account.
- Do not delete accounts solely because someone enters an email address.
- Protect personal information during transmission and processing.
- Explain any applicable data-retention requirements to users.
- Ensure requests are securely recorded and processed by the backend.

## Company

**SafeSync Technologies Ltd.**

Website: [https://www.safesync.co.ke](https://www.safesync.co.ke)

*Every second matters. Every life counts.*

