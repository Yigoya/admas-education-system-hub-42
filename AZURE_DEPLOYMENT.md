# Microsoft Azure Deployment Process

This project is a **Vite + React + TypeScript** frontend app.  
The recommended Azure hosting option is **Azure Static Web Apps**.

## 1) Prerequisites

- An active Azure subscription
- Access to this GitHub repository
- Node.js 18+ and npm (for local validation)
- Azure account permissions to create resources

## 2) Validate the app locally

From the project root:

```bash
npm ci
npm run build
```

The production output will be generated in the `dist/` folder.

## 3) Create Azure Static Web App

1. Sign in to the [Azure Portal](https://portal.azure.com/).
2. Create a new resource: **Static Web App**.
3. Fill in:
   - **Subscription** and **Resource Group**
   - **Name** (for example: `admas-education-system-hub`)
   - **Region**
   - **Hosting plan** (Free/Standard)
4. In **Deployment details**, select:
   - **Source**: GitHub
   - Authorize Azure to your GitHub account
   - Select the repository and target branch (for example `main`)

## 4) Build configuration in Azure

Set the workflow/build values as:

- **App location**: `/`
- **API location**: *(leave empty if no backend in this repo)*
- **Output location**: `dist`

Azure will create a GitHub Actions workflow automatically in your repository.

## 5) Configure environment variables (if needed)

If the app needs environment values:

1. In Azure Static Web App, open **Configuration**.
2. Add required variables.
3. For Vite-based values, use `VITE_` prefix (example: `VITE_API_BASE_URL`).
4. Save and trigger a redeploy.

## 6) Deployment flow

- Every push to the configured branch triggers the Azure-generated GitHub Actions workflow.
- The workflow installs dependencies, builds with Vite, and publishes `dist/` to Azure.
- Pull requests can generate preview environments (if enabled).

## 7) Verify deployment

After deployment:

1. Open the app using the Azure-provided URL.
2. Confirm page load, routing, and static assets.
3. Validate any API calls and environment-dependent features.
4. Check workflow logs in GitHub Actions if deployment fails.

## 8) Optional production hardening

- Add a custom domain and TLS certificate in Static Web App settings.
- Configure role-based access if authentication is required.
- Monitor availability and errors with Azure Monitor / Application Insights.

---

## Alternative: Azure App Service (if server runtime is needed)

If you later add a backend/server process, deploy via **Azure App Service**:

1. Build the app (`npm run build`)
2. Serve `dist/` using a web server (or integrate with backend)
3. Configure startup command and environment variables in App Service
4. Deploy via GitHub Actions or Azure DevOps pipeline

For the current frontend-only project, **Azure Static Web Apps remains the best fit**.
