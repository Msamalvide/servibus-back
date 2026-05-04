import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data)=> this.excludePassword(data)));
  }


  private excludePassword (user: CreateUserDto){
    if(Array.isArray(user)){
      return user.map ((elemt)=>this.excludePassword(elemt))
    }
    const {password, ...rest}= user;
    return rest;;
  }
}
