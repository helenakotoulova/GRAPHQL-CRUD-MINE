import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_PASSWORD } from "../GraphQL/Mutation";
import { LOAD_USERS } from "../GraphQL/Queries";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dataUpdatePassword, setDataUpdatePassword] = useState([]);

  const [updatePassword, { data, error, loading }] = useMutation(
    UPDATE_PASSWORD,
    {
      refetchQueries: [LOAD_USERS],
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    updatePassword({
      variables: {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });
    setEmail("");
    setOldPassword("");
    setNewPassword("");
  };
  /*
  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }*/
  useEffect(() => {
    if (data) {
      setDataUpdatePassword(data.updatePassword);
      console.log(data)
    }
  }, [data]);

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="oldPassword">Old Password:</label>
      <input
        id="oldPassword"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <label htmlFor="newPassword">New Password:</label>
      <input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Change Password!</button>
      {!dataUpdatePassword.successful && <p>{dataUpdatePassword.message}</p>}
    </form>
  );
};

export default ChangePassword;
