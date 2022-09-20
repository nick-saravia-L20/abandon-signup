import { useRouter } from "next/router";
import React from "react";
import { Auth } from "aws-amplify";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const user = await signIn(username, password);

    console.log(user);

    // default handler of errors.
    if (!user) {
      console.log("oh oh");
      return;
    }

    // is a user but password is wrong.

    // is a user but not verified
    if (!user.UserConfirmed) {
      // TODO: send a new code
      console.log("resend code");
      console.log("go to code screen");
      //resendConfirmationCode(username);
      //router.push("/enter-code");
      return;
    }

    router.push("/create-bank-account");

    // TODO: if user is confirmed and logged in send them to some page.
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input name="username"></input>
        <input name="password" type="password"></input>
        <button type="submit">Log In</button>
      </form>

      <button
        onClick={() => {
          Auth.forgotPassword("nick.saravia+uncofirmed@willowtreeapps.com")
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        forgot pass
      </button>
    </>
  );
};

export default Login;

async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.log({ error });
    if (error.code === "UserNotConfirmedException") {
      console.log("user not verified. password did not matter");
      return {
        UserConfirmed: false,
      };
    } else {
      return null;
    }
  }
}

async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log("code resent successfully");
  } catch (err) {
    console.log("error resending code: ", err);
  }
}
