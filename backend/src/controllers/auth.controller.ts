import { Request, Response } from 'express'
import { authService } from '../services/auth.service'
import { sendSuccess, sendCreated } from '../utils/response.util'
import { UnauthorizedError } from '../errors'
import { env } from '../config/env'

const COOKIE = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
}

const setRefreshCookie = (res: Response, token: string) =>
  res.cookie('refresh_token', token, { ...COOKIE, maxAge: 7 * 24 * 60 * 60 * 1000 })

export const authController = {
  async register(req: Request, res: Response) {
    const { user, tokens } = await authService.register(req.body)
    setRefreshCookie(res, tokens.refreshToken)
    sendCreated(res, { user, accessToken: tokens.accessToken }, 'Account created successfully')
  },

  async login(req: Request, res: Response) {
    const { user, tokens } = await authService.login(req.body)
    setRefreshCookie(res, tokens.refreshToken)
    sendSuccess(res, { user, accessToken: tokens.accessToken }, 'Login successful')
  },

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token ?? req.body?.refreshToken
    if (!refreshToken) throw new UnauthorizedError('Refresh token required')
    const tokens = await authService.refreshTokens(refreshToken)
    setRefreshCookie(res, tokens.refreshToken)
    sendSuccess(res, { accessToken: tokens.accessToken }, 'Token refreshed')
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('refresh_token', COOKIE)
    sendSuccess(res, null, 'Logged out successfully')
  },

  async getProfile(req: Request, res: Response) {
    const user = await authService.getProfile(req.user!.id)
    sendSuccess(res, { user })
  },

  async changePassword(req: Request, res: Response) {
    const { currentPassword, newPassword } = req.body
    await authService.changePassword(req.user!.id, currentPassword, newPassword)
    sendSuccess(res, null, 'Password changed successfully')
  },
}
