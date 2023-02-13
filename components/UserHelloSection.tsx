import React, { useEffect, useState } from "react";
import { Database } from "../types/supabase";
import SocialBar from "./SocialBar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function UserHelloSection({
  userData,
  portfolioData,
}: {
  userData: Database["public"]["Tables"]["users"]["Row"];
  portfolioData: Database["public"]["Tables"]["portfolios"]["Row"];
}) {
  const [profilePicture, setProfilePicture] = useState<string>(
    null as unknown as string
  );
  const supabase = useSupabaseClient<Database>();

  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    if (userData.profile_picture) {
      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(userData.profile_picture);

      setProfilePicture(data.publicUrl);
      setLoadding(false);
    }
  }, [userData.profile_picture]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-28 md:flex-row md:gap-14">
      {loadding ? (
        <div className="h-48 w-48 animate-pulse rounded-full bg-black"></div>
      ) : (
        <img src={profilePicture} className="h-48 w-48 rounded-full" />
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1
            className="mb-1 text-lg font-semibold md:mb-3 md:text-4xl"
            style={{ color: portfolioData.text_major_color ?? "black" }}
          >
            Hello, I'm {userData.username}
          </h1>
          <p
            className="text-md mb-3 max-w-md md:text-xl"
            style={{ color: portfolioData.text_minor_2_color ?? "gray" }}
          >
            {userData.description}
          </p>
          <div className="pt-3">
            <SocialBar
              socialsList={["github", "linkedin"]}
              portfolioData={portfolioData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHelloSection;
