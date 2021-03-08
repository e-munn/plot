/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRECIPEInput!
    $condition: ModelRECIPEConditionInput
  ) {
    createRECIPE(input: $input, condition: $condition) {
      id
      recipe
      createdAt
      updatedAt
    }
  }
`;
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRECIPEInput!
    $condition: ModelRECIPEConditionInput
  ) {
    updateRECIPE(input: $input, condition: $condition) {
      id
      recipe
      createdAt
      updatedAt
    }
  }
`;
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRECIPEInput!
    $condition: ModelRECIPEConditionInput
  ) {
    deleteRECIPE(input: $input, condition: $condition) {
      id
      recipe
      createdAt
      updatedAt
    }
  }
`;
