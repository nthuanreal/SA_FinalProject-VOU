import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  getDocumentation(@Res() res: Response): void {
    const documentation = this.appService.getDocumentation();
    res.setHeader('Content-Type', 'text/html');
    res.send(documentation); 
  }
}



