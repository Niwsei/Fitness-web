import { userRepository } from '../repositories/user.repository'
import { hashPassword, comparePassword } from '../utils/hash.util'
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt.util'
import { ConflictError, UnauthorizedError, NotFoundError } from '../errors'
import type { RegisterInput, LoginInput } from '../schemas/auth.schema'

export const authService = {
  async register(input: RegisterInput) {
    if (await userRepository.existsByEmail(input.email)) {
      throw new ConflictError('An account with this email already exists')
    }
    const user = await userRepository.create({
      email: input.email,
      password: await hashPassword(input.password),
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      fitnessGoal: input.fitnessGoal,
    })
    return { user, tokens: generateTokenPair(user.id, user.email, user.role) }
  },

  async login(input: LoginInput) {
    const userWithPass = await userRepository.findByEmail(input.email)
    if (!userWithPass?.password) throw new UnauthorizedError('Invalid email or password')
    if (!(await comparePassword(input.password, userWithPass.password))) {
      throw new UnauthorizedError('Invalid email or password')
    }
    const user = await userRepository.findByEmailSafe(input.email)
    if (!user) throw new UnauthorizedError()
    return { user, tokens: generateTokenPair(user.id, user.email, user.role) }
  },

  async refreshTokens(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken)
    const user = await userRepository.findById(payload.sub)
    if (!user) throw new UnauthorizedError('User not found')
    return generateTokenPair(user.id, user.email, user.role)
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId)
    if (!user) throw new NotFoundError('User')
    return user
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const profile = await userRepository.findById(userId)
    if (!profile) throw new NotFoundError('User')
    const userWithPass = await userRepository.findByEmail(profile.email)
    if (!userWithPass?.password) throw new UnauthorizedError('Cannot change password for OAuth accounts')
    if (!(await comparePassword(currentPassword, userWithPass.password))) {
      throw new UnauthorizedError('Current password is incorrect')
    }
    await userRepository.updatePassword(userId, await hashPassword(newPassword))
  },
}
