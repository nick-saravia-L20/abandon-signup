import "../styles/globals.css";
import { Amplify, Auth, Hub } from "aws-amplify";
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: process.env.NEXT_PUBLIC_COGNITO_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: "code", // 'code' | 'link'

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

// You can get the current config object
const currentConfig = Auth.configure();

Hub.listen("auth", ({ payload }) => {
  console.log("hub listening");
  const { event } = payload;
  console.log("hub", { ...event.data });
  if (event === "autoSignIn") {
    const user = payload.data;
    console.log("autoSignIn", { user });
    // assign user
  } else if (event === "autoSignIn_failure") {
    // redirect to sign in page
  }
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
