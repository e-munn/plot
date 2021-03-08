/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRECIPE(id: $id) {
      id
      recipe
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
