import { PrismaService } from 'prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { AuthDto } from './dto/auth.dto'
import { Response, Request } from 'express'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  generateAccessToken(user: any) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET || 'ACCESS', {
      expiresIn: '15m',
    })
  }

  generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET || 'REFRESH', {
      expiresIn: '30d',
    })
  }

  async register(dto: AuthDto, res: Response) {
    try {
      const candidate = await this.prisma.user.findUnique({
        where: { email: dto.email },
      })

      if (candidate) {
        throw new ConflictException({
          message: 'Пользователь уже существует',
          details: `Пользователь с email "${dto.email}" уже зарегистрирован`,
        })
      }

      const hashPassword = await bcrypt.hash(dto.password, 5)

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword,
        },
      })

      const tokens = await this.issueTokens(user)

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return { accessToken: tokens.accessToken }
    } catch (e) {
      if (e instanceof ConflictException) throw e
      console.error(e)
      throw new BadRequestException({
        message: 'Не удалось зарегистрировать пользователя',
        details: e.message || e,
      })
    }
  }

  async login(dto: AuthDto, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      })

      if (!user) {
        throw new UnauthorizedException({
          message: 'Пользователь не найден',
          details: `Пользователь с email "${dto.email}" не зарегистрирован`,
        })
      }

      const passEquals = await bcrypt.compare(dto.password, user.password)

      if (!passEquals) {
        throw new UnauthorizedException({
          message: 'Неверный пароль',
          details: 'Введённый пароль не совпадает с сохранённым',
        })
      }

      const tokens = await this.issueTokens(user)

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return { accessToken: tokens.accessToken }
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e
      console.error(e)
      throw new BadRequestException({
        message: 'Ошибка при авторизации',
        details: e.message || e,
      })
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const token = req.cookies.refreshToken
      if (!token) {
        throw new UnauthorizedException({
          message: 'Отсутствует токен обновления',
          details: 'Пожалуйста, авторизуйтесь снова',
        })
      }

      let userData;
      try {
        userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'REFRESH')
      } catch (e) {
        throw new UnauthorizedException({
          message: 'Неверный токен обновления',
          details: 'Токен повреждён или истёк',
        })
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userData.id },
      })

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException({
          message: 'Пользователь не найден или нет refreshToken',
          details: 'Невозможно обновить токены',
        })
      }

      const tokenMatches = await bcrypt.compare(token, user.refreshToken)
      if (!tokenMatches) {
        throw new UnauthorizedException({
          message: 'Токен обновления не совпадает',
          details: 'Пожалуйста, авторизуйтесь снова',
        })
      }

      const tokens = await this.issueTokens(user)

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return { accessToken: tokens.accessToken }
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e
      console.error(e)
      throw new BadRequestException({
        message: 'Ошибка при обновлении токена',
        details: e.message || e,
      })
    }
  }

  async issueTokens(user: any) {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      }

      const accessToken = this.generateAccessToken(payload)
      const refreshToken = this.generateRefreshToken(payload)

      const hashRefresh = await bcrypt.hash(refreshToken, 5)

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashRefresh },
      })

      return { accessToken, refreshToken }
    } catch (e) {
      console.error(e)
      throw new BadRequestException({
        message: 'Ошибка при генерации токенов',
        details: e.message || e,
      })
    }
  }
}