import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { AccountModule } from './account/account.module';

@Global()
@Module({
    imports: [JwtModule.register({ secret: 'secretKey' }), AuthModule, AccountModule],
    controllers: [],
    providers: [],
    exports: [JwtModule],
})
export class AppModule {}
