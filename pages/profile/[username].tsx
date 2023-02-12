import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/supabase";
import SectionComponent from "@/components/Section";

function Username() {
  const router = useRouter();
  const { username } = router.query;
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<
    Database["public"]["Tables"]["users"]["Row"]
  >(null as unknown as Database["public"]["Tables"]["users"]["Row"]);

  const [userSections, setUserSections] = useState<
    Array<Database["public"]["Tables"]["sections"]["Row"]>
  >([]);

  async function getUserData() {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();
    if (error) {
      console.log(error);
    } else {
      setUserData(data);
      console.log("data: ", data);
      console.log("set user data");
    }
  }

  async function getUserSections(portfolioId: number) {
    const { data, error } = await supabase
      .from("sections")
      .select()
      .eq("portfolio", portfolioId);
    if (error) {
      console.log(error);
    }
    setUserSections(
      data as Array<Database["public"]["Tables"]["sections"]["Row"]>
    );
  }

  async function getUserCards(
    sectionId: number
  ): Promise<Array<Database["public"]["Tables"]["cards"]["Row"]>> {
    const { data, error } = await supabase
      .from("cards")
      .select()
      .eq("section", sectionId);
    if (error) {
      console.log(error);
    }
    console.log("data: ", data);
    return data as Array<Database["public"]["Tables"]["cards"]["Row"]>;
  }

  useEffect(() => {
    console.log("router.isReady: ", router.isReady);
    if (router.query.username) {
      getUserData();
      console.log("userData: ", userData);
    }
  }, [router.query, router.isReady]);

  //   useEffect(() => {
  //     console.log("router.isReady: ", router.isReady);
  //     if (!router.isReady) return;
  //     (async () => {
  //       console.log("useEffect getUserData");
  //       await getUserData();
  //       console.log("getUserData, userData: ", userData);
  //       if (userData) {
  //         console.log("userData.id: ", userData.id);
  //         getUserSections(userData.id);
  //         console.log("userSections: ", userSections);
  //       } else {
  //         console.log("userData is null");
  //       }
  //     })();
  //   }, [username, router.isReady]);

  if (username === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Welcome to {userData?.username} 's portfolio</h1>
        {userSections?.map(
          (section: Database["public"]["Tables"]["sections"]["Row"], index) => (
            <div key={index}>
              <SectionComponent
                sectionInformation={
                  section as Database["public"]["Tables"]["sections"]["Row"]
                }
                cardsList={
                  getUserCards(section.id) as unknown as Array<
                    Database["public"]["Tables"]["cards"]["Row"]
                  >
                }
              />
            </div>
          )
        )}
      </div>
    );
  }
}

export default Username;
