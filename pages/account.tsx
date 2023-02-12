import React from "react";
import { useUser } from "@supabase/auth-helpers-react";

function Account() {
  const user = useUser();

  return (
    <div>
      <h1>Account</h1>
      <p>{user?.email}</p>
      <p>{user?.id}</p>
    </div>
  );
}

export default Account;
