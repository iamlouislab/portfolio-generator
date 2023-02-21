import React, { useEffect, useState } from "react";
import { Database } from "../types/supabase";
import SocialBar from "./SocialBar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { baseColors } from "@/lib/utils";

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
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    try {
      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(`/${userData.user_id}/profile_picture`);
      setProfilePicture(data.publicUrl);
      setHasImage(true);
      setLoadding(false);
      console.log(data.publicUrl);
    } catch (error) {
      console.log(error);
      setHasImage(false);
      setLoadding(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-28 md:flex-row md:gap-14">
      {loadding ? (
        <div className="h-48 w-48 animate-pulse rounded-full bg-black"></div>
      ) : (
        <img
          src={
            hasImage
              ? profilePicture
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
          }
          className="h-48 w-48 rounded-full"
        />
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1
            className="mb-1 text-lg font-semibold md:mb-3 md:text-4xl"
            style={{
              color:
                portfolioData.text_major_color ?? baseColors.text_major_color,
            }}
          >
            Hello, I'm {userData.username}
          </h1>
          <p
            className="text-md mb-3 max-w-md md:text-xl"
            style={{
              color:
                portfolioData.text_minor_2_color ??
                baseColors.text_minor_2_color,
            }}
          >
            {userData.description}
          </p>
          <div className="pt-3">
            <SocialBar userData={userData} portfolioData={portfolioData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHelloSection;
