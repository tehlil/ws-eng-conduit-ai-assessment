import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Lock {
  @PrimaryKey()
  id!: number;

  @Property()
  articleSlug!: string;

  @Property()
  userId!: number;
}
