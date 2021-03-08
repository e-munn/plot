// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RECIPE } = initSchema(schema);

export {
  RECIPE
};