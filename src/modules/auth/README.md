# Auth Module Documentation

## Overview
Complete user authentication and registration module with PostgreSQL integration, password hashing, and JWT token management.

## Features
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Form validation with Zod
- ✅ Type-safe TypeScript implementation
- ✅ React Hook Form integration
- ✅ Server-side actions
- ✅ Repository pattern for database access
- ✅ Service layer for business logic

## File Structure
```
auth/
├── types/
│   └── index.ts           # TypeScript interfaces
├── validations/
│   └── index.ts           # Zod schemas and validation
├── repositories/
│   └── user.repository.ts # Database operations
├── services/
│   └── auth.service.ts    # Business logic
├── actions/
│   └── register.action.ts # Server actions
├── components/
│   ├── RegisterForm.tsx   # Registration form component
│   └── LoginForm.tsx      # Login form component
├── index.ts               # Module exports
└── README.md              # This file
```

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Email Validation
- Valid email format required
- Unique email (no duplicates allowed)
- Case-insensitive

## Environment Variables
Required in `.env` or `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="your-secure-secret-key-change-in-production"
```

## Usage Examples

### Server Action - Register
```typescript
import { registerAction } from '@/modules/auth';

const result = await registerAction({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123',
  confirmPassword: 'SecurePass123',
});

if (result.success) {
  console.log('User registered:', result.user);
  console.log('Token:', result.token);
} else {
  console.error('Error:', result.error);
}
```

### Server Action - Login
```typescript
import { loginAction } from '@/modules/auth';

const result = await loginAction({
  email: 'john@example.com',
  password: 'SecurePass123',
});

if (result.success) {
  console.log('Logged in:', result.user);
  console.log('Token:', result.token);
}
```

### React Component
```typescript
'use client';

import { RegisterForm } from '@/modules/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <RegisterForm />
    </div>
  );
}
```

## API Response Format
All actions return:
```typescript
interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token?: string;
  error?: string;
}
```

## Token Management
- JWT tokens are valid for 7 days
- Tokens include user ID and email
- Store tokens in localStorage (client-side) or secure cookies
- Pass tokens in Authorization header for API requests

## Database Schema
```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Security Considerations
- ⚠️ Change `JWT_SECRET` in production
- ⚠️ Use HTTPS in production
- ⚠️ Store sensitive data in environment variables
- ✅ Passwords are hashed with bcryptjs (salt rounds: 12)
- ✅ Email validation prevents injection
- ✅ Token expiration after 7 days

## Extending the Module

### Add New Validations
Edit `validations/index.ts`:
```typescript
export const profileSchema = z.object({
  bio: z.string().max(500),
  avatar: z.string().url(),
});
```

### Add New Repository Methods
Edit `repositories/user.repository.ts`:
```typescript
async findByName(name: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: { name },
  });
}
```

### Add New Services
Create `services/profile.service.ts` and follow the same pattern.

## Error Handling
All operations return `AuthResponse` with:
- `success`: boolean indicating success/failure
- `message`: user-friendly message
- `error`: detailed error information (if failed)
- `user` & `token`: populated only on success

## Future Enhancements
- [ ] OAuth integration (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Social login
- [ ] Role-based access control (RBAC)
- [ ] Refresh token rotation
- [ ] Session management
