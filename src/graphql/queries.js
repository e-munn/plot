/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncRecipes = /* GraphQL */ `
  query SyncRecipes(
    $filter: ModelRECIPEFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRECIPES(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        recipe
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRECIPE(id: $id) {
      id
      recipe
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listRecipEs = /* GraphQL */ `
  query ListRecipEs(
    $filter: ModelRECIPEFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRECIPEs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        recipe
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
