import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Router, useRouter } from "next/router";

const EnterCode = () => {
  const router = useRouter();
  const [userAttributes, setUserAttributes] = useState(null);

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    console.log(code);
    // send code to cognito to verify
    // TODO: place username here
    const userConfirmed = confirmSignUp(
      "nick.saravia@willowtreeapps.com",
      code
    );

    if (userConfirmed) router.push("/create-bank-account");
    else {
      // TODO: show error that userConfirmation code did not work
    }
  };
  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    setUserAttributes(attributes);
  };
  return (
    <>
      <form onSubmit={handleVerifyCode}>
        <input name="code"></input>
        <button type="submit">confirm code</button>
      </form>

      <div>
        {userAttributes
          ? JSON.stringify(userAttributes, null, "\n")
          : "no user session"}
      </div>
    </>
  );
};

export default EnterCode;

async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
    return true;
  } catch (error) {
    console.log("error confirming sign up", error);
    return false;
  }
}
