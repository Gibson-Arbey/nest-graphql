import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Hola mundo es lo que retorna',
    name: 'hello',
  })
  hello(): string {
    return 'Hola mundo';
  }

  @Query(() => Float, {
    description: 'Retorna un numero aleatorio',
    name: 'randomNumber',
  })
  getRandomNunber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: 'Retorna un numero entre 0 y un limite, por defecto en 10',
    name: 'randomFromZeroTO',
  })
  getRandomFromZeroTo(
    @Args('limit', { nullable: true, type: () => Int }) limit: number = 10,
  ): number {
    return Math.trunc(Math.random() * limit) + 1;
  }
}
