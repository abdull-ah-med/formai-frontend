# Formai Frontend

React + Vite + TypeScript frontend for AI-powered form generation with Google Forms export.

## Architecture

```
src/
├── App.tsx           Root component
├── main.tsx          Entry point
├── routes.tsx        Client-side routing
├── index.css         Global styles (Tailwind)
├── api/
│   └── index.ts      Axios client and API helpers
├── auth/
│   ├── authHelper.ts Auth utilities
│   └── googleOAuth.ts OAuth helpers
├── components/
│   ├── GoogleAuthCallback.tsx  OAuth code exchange
│   ├── SessionManager.tsx      Session management
│   └── ui/
│       ├── FormBuilder.tsx     Form preview + revision
│       ├── FormFinalizeButton.tsx  Export flow
│       ├── DashboardLayout.tsx
│       ├── navbar.tsx
│       ├── history.tsx
│       ├── accountSettings.tsx
│       └── ...
├── contexts/
│   ├── AuthContext.tsx         Authentication state
│   └── FormContext.tsx         Form generation state
├── hooks/
│   └── useAuth.ts              Auth hook
├── schemas/
│   ├── loginSchema.ts          Yup validation
│   └── signUpSchema.ts
├── types/
│   ├── form.d.ts
│   ├── env.d.ts
│   └── ...
└── utils/
    ├── formValidation.ts
    └── useDocumentTitle.ts
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/signup` | SignUp | User registration |
| `/signin` | SignIn | User login |
| `/auth/google/callback` | GoogleAuthCallback | OAuth callback handler |
| `/dashboard` | Dashboard | Form generation UI |
| `/history` | History | Past forms list |
| `/account-settings` | AccountSettings | User settings |

Protected routes require authentication and are wrapped with `ProtectedRoute`.

## Environment Variables

Create a `.env` file with:

```env
# API
VITE_API_BASE_URL=http://localhost:4000/api

# Frontend URL (for OAuth redirect)
VITE_FRONTEND_URL=http://localhost:5173

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=your-site-key
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

### API Proxy

Vite dev server proxies `/api` requests to `http://localhost:4000` (configured in `vite.config.js`).

## Key Components

### FormBuilder

Main form generation and preview component:
- Natural language prompt input
- Real-time form preview
- Revision with follow-up prompts
- Validation hints display

### FormFinalizeButton

Handles Google Forms export flow:
- Permission check dialog
- Google account reconnect flow
- Export confirmation

### GoogleAuthCallback

Processes OAuth callback:
- Exchanges authorization code for tokens
- Handles account linking
- Redirects after successful auth

### SessionManager

Manages authentication state:
- Token validation
- Auto-logout on expiry
- Session persistence

## Contexts

### AuthContext

```tsx
const { user, isAuthenticated, login, logout, loading } = useAuth();
```

Provides:
- `user` - Current user object
- `isAuthenticated` - Boolean auth state
- `login(email, password)` - Login function
- `logout()` - Logout function
- `loading` - Auth loading state

### FormContext

```tsx
const { form, generateForm, reviseForm, finalizeForm } = useForm();
```

Provides:
- `form` - Current form data
- `generateForm(prompt)` - Generate new form
- `reviseForm(formId, prompt)` - Revise existing form
- `finalizeForm(formId)` - Export to Google Forms

## Security

- **DOMPurify**: Sanitizes rendered strings from generated schemas
- **Formik + Yup**: Client-side form validation
- **reCAPTCHA**: Bot protection on auth forms
- **Honeypot fields**: Additional bot detection

## Google OAuth Flow

1. User clicks "Sign in with Google"
2. Frontend builds consent URL with scopes:
   - `openid email profile`
   - `https://www.googleapis.com/auth/forms`
   - `https://www.googleapis.com/auth/drive.file`
3. User authorizes on Google
4. Redirect to `/auth/google/callback` with code
5. `GoogleAuthCallback` sends code to backend
6. Backend exchanges code, creates/links user
7. Frontend stores token, redirects to dashboard

### Account Linking

Existing users can link Google by:
1. Going to Account Settings
2. Clicking "Link Google Account"
3. OAuth flow with `state` containing `userId`
4. Backend links Google credentials to existing account

## Styling

- **TailwindCSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom components**: `src/components/ui/`

## Build & Deployment

```bash
# Production build
npm run build

# Output in dist/
```

Deploy `dist/` to any static hosting:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any CDN

### Vercel Configuration

`vercel.json` handles SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment Variables for Production

Set in your hosting platform:
- `VITE_API_BASE_URL` → Production API URL
- `VITE_FRONTEND_URL` → Production frontend URL
- `VITE_GOOGLE_CLIENT_ID` → Same as dev
- `VITE_RECAPTCHA_SITE_KEY` → Production reCAPTCHA key

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure backend `FRONTEND_URL` matches this app's origin |
| OAuth redirect fails | Verify redirect URI in Google Cloud Console |
| API 401 errors | Check token is being sent (cookie or header) |
| Form preview blank | Check browser console for schema validation errors |
| reCAPTCHA fails | Verify site key matches domain |

## License

MIT
