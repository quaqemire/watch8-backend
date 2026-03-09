import { Body, Controller, Post, Res, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import type { Response, Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registration(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.register(dto, res)
  }

  @Post('/login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(dto, res)
  }

  @Post('/refresh')
  refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(req, res)
  }
}