
// Define the Feathers schema for service `role`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
const schema = {
  // !<DEFAULT> code: schema_header
  title: 'Role',
  description: 'Role database.',
  // !end
  // !code: schema_definitions
  fakeRecords: 4,
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'name',
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    id: { type: 'ID' },
    name: { minLength: 1, maxLength: 24, faker: 'name.title' },
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
const extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'Role',
    service: {
      sort: { _id: 1 },
    },
    // sql: {
    //   sqlTable: 'Role',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !<DEFAULT> code: graphql_add
      // __author__: { type: '__User__!', args: false, relation:
      //   { ourTable: '__authorId__', otherTable: '_id' } },
      // !end
    },
    // !code: graphql_more // !end
  },
};

// !code: more // !end

const moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
