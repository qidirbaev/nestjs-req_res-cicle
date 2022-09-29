import { Body, Controller, Get, InternalServerErrorException, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LogInterceptor } from './interceptors/log.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';
import { RequestService } from './request/request.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly requestService: RequestService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(LogInterceptor)
  getHello(): string {
    const userId = this.requestService.getUserId();
    console.log('AppController.getHello() userId:', userId);
    return this.appService.getHello();
  }

  @Get('test')
  @UsePipes(FreezePipe)
  @UseFilters()
  getTest(@Body() body: any): string {
    body.name = 'test';
    return 'test';
  }

  @Get('error')
  getError(): any {
    throw new InternalServerErrorException('Something went wrong');
  }
}
