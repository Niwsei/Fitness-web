import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { UnauthorizedError } from '../errors'

export interface JwtPayload {
  sub: string
  email: string
  role: string
  type: 'access' | 'refresh'
}

export function signAccessToken(payload: Omit<JwtPayload, 'type'>): string {
  return jwt.sign({ ...payload, type: 'access' }, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN })
}

export function signRefreshToken(payload: Omit<JwtPayload, 'type'>): string {
  return jwt.sign({ ...payload, type: 'refresh' }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN })
}

export function verifyAccessToken(token: string): JwtPayload {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload
    if (payload.type !== 'access') throw new Error('Invalid token type')
    return payload
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) throw new UnauthorizedError('Access token expired')
    throw new UnauthorizedError('Invalid access token')
  }
}

export function verifyRefreshToken(token: string): JwtPayload {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload
    if (payload.type !== 'refresh') throw new Error('Invalid token type')
    return payload
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) throw new UnauthorizedError('Refresh token expired')
    throw new UnauthorizedError('Invalid refresh token')
  }
}

export function generateTokenPair(userId: string, email: string, role: string) {
  const payload = { sub: userId, email, role }
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  }
}
