
import { type SchemaTypeDefinition } from 'sanity'


import { startup} from '@/sanity/schemaTypes/startup'
import {author} from '@/sanity/schemaTypes/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ author, startup],
}
