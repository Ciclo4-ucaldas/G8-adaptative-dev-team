import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Root extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  names: string;

  @property({
    type: 'string',
    required: true,
  })
  lastnames: string;

  @property({
    type: 'date',
    required: true,
  })
  dateIn = new Date();

  @property({
    type: 'string',
    required: true,
  })
  mailUser: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: "rootRole",
  })
  role?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Root>) {
    super(data);
  }
}

export interface RootRelations {
  // describe navigational properties here
}

export type RootWithRelations = Root & RootRelations;
