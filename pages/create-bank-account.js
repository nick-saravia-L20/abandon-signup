import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

const CreateBankAccount = () => {
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    console.log(attributes);
    setUserAttributes(attributes);
  };

  return (
    <div>
      CreateBankAccount
      <div>
        {userAttributes
          ? JSON.stringify(userAttributes, null, "\n")
          : "no user session"}
      </div>
    </div>
  );
};

export default CreateBankAccount;
