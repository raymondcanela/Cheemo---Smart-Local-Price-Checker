import type { AuthResponse, LoginPayload, SignupPayload, User } from '../types/auth';

// Temporary in-memory mock "database" — resets on page refresh.
// Replace with real fetch calls to FastAPI once /auth endpoints exist.
const mockUsers: (User & { password: string })[] = [
  { user_id: 1, name: 'Riyan Mariano', email: 'riyan@example.com', password: 'password123' },
];

const MOCK_DELAY = 500;

function generateMockToken(user: User): string {
  return btoa(JSON.stringify({ user_id: user.user_id, email: user.email, exp: Date.now() + 1000 * 60 * 60 }));
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  const found = mockUsers.find((u) => u.email === payload.email && u.password === payload.password);
  if (!found) {
    throw new Error('Invalid email or password');
  }

  const user: User = { user_id: found.user_id, name: found.name, email: found.email };
  return { access_token: generateMockToken(user), token_type: 'bearer', user };
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  if (mockUsers.some((u) => u.email === payload.email)) {
    throw new Error('Email already registered');
  }

  const newUser = { user_id: mockUsers.length + 1, ...payload };
  mockUsers.push(newUser);

  const user: User = { user_id: newUser.user_id, name: newUser.name, email: newUser.email };
    return { access_token: generateMockToken(user), token_type: 'bearer', user };
}