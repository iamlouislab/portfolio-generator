import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/supabase";
import SectionComponent from "@/components/Section";
import UserHelloSection from "@/components/UserHelloSection";

function Username() {
  const router = useRouter();
  const { username } = router.query;
  const supabase = useSupabaseClient<Database>();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [portfolio, setPortfolio] = useState<
    Database["public"]["Tables"]["portfolios"]["Row"]
  >(null as unknown as Database["public"]["Tables"]["portfolios"]["Row"]);

  const [userData, setUserData] = useState<
    Database["public"]["Tables"]["users"]["Row"]
  >(null as unknown as Database["public"]["Tables"]["users"]["Row"]);

  const [userSections, setUserSections] = useState<
    Array<Database["public"]["Tables"]["sections"]["Row"]>
  >([]);

  const loadData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();
    if (error) {
      console.log(error);
    } else {
      setUserData(data as Database["public"]["Tables"]["users"]["Row"]);
      const portfolioData = await supabase
        .from("portfolios")
        .select()
        .eq("user", data.id)
        .single();
      if (portfolioData.error) {
        console.log(error);
      } else {
        setPortfolio(
          portfolioData.data as Database["public"]["Tables"]["portfolios"]["Row"]
        );
        const sectionsData = await supabase
          .from("sections")
          .select()
          .eq("portfolio", portfolioData.data.id);
        if (error) {
          console.log(error);
        } else {
          setUserSections(
            sectionsData.data as Array<
              Database["public"]["Tables"]["sections"]["Row"]
            >
          );
          setLoadingComplete(true);
        }
      }
    }
  };

  useEffect(() => {
    console.log("router.isReady: ", router.isReady);
    if (router.query.username && router.isReady && !userData) {
      loadData();
    }
  }, [router.query, router.isReady, userData, portfolio]);

  if (username === undefined || !loadingComplete) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: portfolio.background_color ?? "black" }}>
        <div className="mx-auto w-5/6">
          <UserHelloSection userData={userData} portfolioData={portfolio} />
          {userSections?.map(
            (
              section: Database["public"]["Tables"]["sections"]["Row"],
              index
            ) => (
              <div key={index}>
                <SectionComponent
                  key={index}
                  sectionInformation={
                    section as Database["public"]["Tables"]["sections"]["Row"]
                  }
                  portfolioData={portfolio}
                />
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default Username;
