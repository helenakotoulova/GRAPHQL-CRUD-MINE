import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
        successful
        message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
        successful
        message
    }
  }
`;
