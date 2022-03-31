import React, { useState, useEffect } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutation";
import { LOAD_USERS } from "../GraphQL/Queries";
import { useMutation } from "@apollo/client";
import classes from "./Form.module.css";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mutationResult, setMutationResult] = useState([]);

  // ten nazev (to createUser) musi byt stejne jako ten nazev v serveru / schemas / index.js
  const [createUser, { data, error, loading }] = useMutation(
    CREATE_USER_MUTATION,
    {
      refetchQueries: [LOAD_USERS],
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    setLastName("");
    setFirstName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (data) {
      setMutationResult(data);
    }
  }, [data]);

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className={classes.submitButton} type="submit">
        {" "}
        Create User
      </button>
    </form>
  );
}

export default Form;
