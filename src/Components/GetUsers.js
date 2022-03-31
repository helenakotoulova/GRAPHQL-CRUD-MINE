import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import classes from "./GetUsers.module.css";
import { DELETE_USER_MUTATION } from "../GraphQL/Mutation";

function GetUsers() {
  const [queryResults, setQueryResults] = useState([])
  const [mutationResults, setMutationResults] = useState([]);

  const { error:errorLoadUsers, loading:loadingLoadUsers, data:dataLoadUsers } = useQuery(LOAD_USERS);
  const [
    deleteUser,
    {
      error: errorDeleteUser,
      loading: loadingDeleteUser,
      data: dataDeleteUser,
    },
  ] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [LOAD_USERS],
  });

  useEffect(() => {
    if (dataLoadUsers) {
      setQueryResults(dataLoadUsers.getAllUsers);
      //console.log(data.getAllUsers[0].firstName) // Helena - data jsou object, ten obsahuje getAllUsers, coz je array objektu.
    }
  }, [dataLoadUsers]);

  useEffect(() => {
    if (dataDeleteUser) {
      setMutationResults(dataDeleteUser);
    }
  }, [dataDeleteUser]);

  const deleteHandler = (id) => {
    deleteUser({
      variables: {
        id: id,
      },
    });
  };

  if (errorLoadUsers) {
    return <p>{errorLoadUsers}</p>;
  }
  if (errorDeleteUser) {
    return <p>{errorDeleteUser}</p>;
  }
  if (loadingLoadUsers || loadingDeleteUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul className={classes.list}>
        {queryResults.map((user) => (
          <li key={user.id} onClick={deleteHandler.bind(null, user.id)}>
            {user.firstName} {user.lastName} {user.email} {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetUsers;
