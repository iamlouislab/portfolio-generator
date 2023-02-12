import React from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

function AccountButton() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleClick = () => {
    if (user) {
      handleLogout();
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <button onClick={handleClick} className="btn">
      {user ? "Logout" : "Login"}
    </button>
  );
}

export default AccountButton;
