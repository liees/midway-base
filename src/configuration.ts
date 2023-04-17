import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import * as view from '@midwayjs/view-nunjucks';
import { WeatherErrorFilter } from './filter/weather.filter';
import * as orm from '@midwayjs/typeorm';

@Configuration({
  imports: [
    orm,
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    view,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([WeatherErrorFilter]);
  }
}
