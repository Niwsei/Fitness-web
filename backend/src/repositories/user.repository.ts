import { Prisma, User } from '@prisma/client'
import { prisma } from '../config/database'

export type SafeUser = Omit<User, 'password'>

const safeSelect = {
  id: true, email: true, firstName: true, lastName: true,
  phone: true, role: true, fitnessGoal: true, createdAt: true, updatedAt: true,
} satisfies Prisma.UserSelect

export const userRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id }, select: safeSelect }),
  findByEmail: (email: string): Promise<User | null> => prisma.user.findUnique({ where: { email } }),
  findByEmailSafe: (email: string) => prisma.user.findUnique({ where: { email }, select: safeSelect }),
  create: (data: Prisma.UserCreateInput) => prisma.user.create({ data, select: safeSelect }),
  update: (id: string, data: Prisma.UserUpdateInput) => prisma.user.update({ where: { id }, data, select: safeSelect }),
  updatePassword: (id: string, hashedPassword: string) =>
    prisma.user.update({ where: { id }, data: { password: hashedPassword } }),
  existsByEmail: async (email: string): Promise<boolean> => (await prisma.user.count({ where: { email } })) > 0,
  findMany: (args: Prisma.UserFindManyArgs) => prisma.user.findMany({ ...args, select: safeSelect }),
  count: (where?: Prisma.UserWhereInput) => prisma.user.count({ where }),
}
