# DemoStore - Smart Feature Release Management SDK Demo

A realistic e-commerce demonstration application (**DemoStore**) that consumes feature flags from the **Smart Feature Release Management** platform using an environment-scoped SDK key.

---

## Architecture Overview

The DemoStore application follows a secure 2-tier client-server model to ensure the **SDK Key is kept strictly on the backend** and never exposed to browser JavaScript or client-side network requests.

```
Smart Feature Release Management Platform (Port 5000)
                        │
                        │ HTTP SDK API (GET /api/sdk/features)
                        │ Authorization: Bearer <ROLLOUT_SDK_KEY>
                        ▼
            Demo Backend Service (Port 5001)
                        │
                        │ HTTP GET /api/features (SDK key hidden)
                        ▼
            Demo Frontend SPA (Port 5173)
                        │
                        ▼
             Feature-Controlled UI
```

---

## Features Demonstrated

### 1. 🌙 `dark-mode`
- **OFF (`false`)**: DemoStore operates in crisp Light Mode.
- **ON (`true`)**: DemoStore dynamically transforms its visual appearance into Dark Mode across background colors, cards, navbar, buttons, and footers.

### 2. ✨ `new-checkout`
- **OFF (`false`)**: Cart opens **Classic Checkout** (standard order summary with shipping address input).
- **ON (`true`)**: Cart opens **✨ New Checkout Experience** featuring 1-Click Apple/Google Pay, promo code auto-applier, express shipping options, and modern UI elements.

---

## Security & SDK Authentication

- **Authentication Method**: `Authorization: Bearer <ROLLOUT_SDK_KEY>`
- **Environment Scope**: The key is bound to a specific environment (e.g. `qa-testing`).
- **Client Security**: The browser communicates only with `http://localhost:5001/api/features`. The frontend never accesses or stores the SDK key.

---

## Setup Instructions

### 1. Configure Backend Environment

Navigate to the `backend` directory and create `.env` from `.env.example`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
ROLLOUT_API_URL=http://localhost:5000
ROLLOUT_SDK_KEY=rf_qa-xxxxxxxxxxxxxxxx
PORT=5001
```

> Replace `rf_qa-xxxxxxxxxxxxxxxx` with your environment SDK key generated from the Rollout platform dashboard.

### 2. Install Dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

---

## Running the Application

### 1. Start the Demo Backend (Port 5001)
```bash
cd backend
npm run dev
```

### 2. Start the Demo Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

Open your browser to: **`http://localhost:5173`**

---

## How to Demonstrate Feature Flags

1. Ensure the **Smart Feature Release Management** platform backend is running on `http://localhost:5000`.
2. Log into the Rollout dashboard and open your project environment (e.g., `qa-testing`).
3. Ensure feature flags with keys `dark-mode` and `new-checkout` exist.
4. **Test `dark-mode`**:
   - Turn `dark-mode` **ON** in Rollout.
   - Click **[Refresh Features]** in DemoStore (or in the Feature Flags console).
   - Observe DemoStore instantly switch to **Dark Theme**.
5. **Test `new-checkout`**:
   - Turn `new-checkout` **ON** in Rollout.
   - Click **[Refresh Features]**.
   - Click **Cart** -> Notice the **✨ Express 1-Click Checkout** experience.
6. **Test Platform Fallback**:
   - Stop the Rollout backend or set an invalid SDK key.
   - Click **[Refresh Features]** -> DemoStore safely defaults (`dark-mode=false`, `new-checkout=false`) and shows a connection warning without crashing.

---

## Ports Summary

| Service | Port | Description |
| :--- | :--- | :--- |
| **Rollout Platform** | `5000` | Existing Feature Flag Provider API |
| **Demo Backend** | `5001` | Express service proxying feature evaluation |
| **Demo Frontend** | `5173` | React + Vite DemoStore UI |

---

## Troubleshooting

- **SDK Key missing warning**: Ensure `ROLLOUT_SDK_KEY` is specified in `backend/.env`.
- **CORS Error**: Demo Backend is configured with `cors()`. Ensure requests originate from `http://localhost:5173`.
- **Invalid Key Response**: Regenerate a fresh SDK key in the Rollout Platform dashboard under Environment Settings.
