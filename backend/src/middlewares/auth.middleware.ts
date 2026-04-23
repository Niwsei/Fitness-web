import { Request, Response, NextFunction } from 'express'
import { Role } from '@prisma/client'
import { verifyAccessToken } from '../utils/jwt.util'
import { UnauthorizedError, ForbiddenError } from '../errors'
import { asyncHandler } from '../utils/asyncHandler.util'

export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  let token: string | undefined
  const auth = req.headers.authorization
  if (auth?.startsWith('Bearer ')) token = auth.slice(7)
  if (!token && req.cookies?.access_token) token = req.cookies.access_token as string
  if (!token) throw new UnauthorizedError('No token provided')

  const payload = verifyAccessToken(token)
  req.user = { id: payload.sub, email: payload.email, role: payload.role as Role }
  next()
})

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) throw new UnauthorizedError()
    if (!roles.includes(req.user.role)) throw new ForbiddenError('Insufficient permissions')
    next()
  }
}

export const optionalAuthenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const auth = req.headers.authorization
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : req.cookies?.access_token
  if (token) {
    try {
      const payload = verifyAccessToken(token as string)
      req.user = { id: payload.sub, email: payload.email, role: payload.role as Role }
    } catch { /* silent */ }
  }
  next()
})
