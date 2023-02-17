import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/supabase";
import SectionComponent from "@/components/Section";
import UserHelloSection from "@/components/UserHelloSection";
import { Loading } from "@/components/Loading";
import { baseColors } from "../../lib/utils"

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

  const [unknownUser, setUnknownUser] = useState(false);
  const [noPortfolio, setNoPortfolio] = useState(false);

  const loadData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();
    if (error) {
      // No user found
      console.log(error);
      setUnknownUser(true);
      setLoadingComplete(true);
    } else {
      setUserData(data as Database["public"]["Tables"]["users"]["Row"]);
      const portfolioData = await supabase
        .from("portfolios")
        .select()
        .eq("user_id", data.user_id)
        .single();
      if (portfolioData.error) {
        console.log(error);
        setNoPortfolio(true);
        setLoadingComplete(true);
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    if (unknownUser) {
      return <div>Unknown user</div>;
    } else {
      if (noPortfolio) {
        return <div>User has no portfolio</div>;
      } else {
        return (
          <div
            style={{ backgroundColor: portfolio.background_color ?? baseColors.background_color }}
            className="min-h-screen"
          >
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
  }
}

export default Username;
