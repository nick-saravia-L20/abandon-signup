import React, { useEffect } from "react";
import { Hub, Auth } from "aws-amplify";
import { useRouter } from "next/router";

const SignUP = () => {
  const router = useRouter();

  const handleSignUP = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const user = await signUp(username, password);

    // default handler of errors.
    if (!user) {
      console.log("oh oh");
      return;
    }

    //TODO: save user to username to userProvider. will need that for code confirmation;
    if (!user.UserConfirmed) {
      console.log("user not confirmed");
      // resend verification code only when user already exists.
      // when a user sign's up for the first time a code is sent automatically.
      if (user.ResendCode) {
        //resendConfirmationCode(username);
        console.log("resending email");
      }
      //router.push("/enter-code");
    }

    //TODO: handle when user is confirmed and they went this route
  };

  return (
    <div>
      <form onSubmit={handleSignUP}>
        <input name="username"></input>
        <input name="password" type="password"></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUP;

async function signUp(username, password) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email: username, // optional
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    return user;
  } catch (error) {
    console.log("error signing up:", error);
    if (error.code === "UsernameExistsException") {
      console.log("user already in system error");
      return {
        UserConfirmed: false,
        ResendCode: true,
      };
    }
    return null;
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
