import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Agregaciones rápidas de usuarios' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  inactiveUsers: number;

  @Field(() => Int)
  activesUsers: number;

  @Field(() => Int, {
    deprecationReason: 'En su lugar, la mayoría utiliza activesUsers',
  })
  totalActivesUsers: number;
}
