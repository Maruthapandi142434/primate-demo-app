import jwt from 'jsonwebtoken';

// Validate and ensure JWT_SECRET is always a string
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT_SECRET environment variable is not properly configured');
  }
  return secret;
};

interface JwtPayload {
  userId: number;
  [key: string]: any; // Allow additional properties
}

// Production-ready token generation with proper typing
export function generateToken(payload: JwtPayload, expiresIn: string | number = '1d'): string {
  const secret = getJwtSecret();
  
  // Type assertion for string expiresIn values
  const options: jwt.SignOptions = { 
    algorithm: 'HS256'
  };

  if (typeof expiresIn === 'number') {
    options.expiresIn = expiresIn;
  } else {
    // Type assertion for string time formats
    options.expiresIn = expiresIn as jwt.SignOptions['expiresIn'];
  }
  
  return jwt.sign(payload, secret, options);
}

// Robust token verification
export function verifyToken(token: string): JwtPayload | null {
  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);
    
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as JwtPayload;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Token verification failed:', error.message);
    }
    return null;
  }
}