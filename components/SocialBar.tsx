import React from "react";
import { LinkedinIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { Database } from "@/types/supabase";
import { baseColors } from "@/lib/utils";

const getIcon = (name: string, color: string) => {
  switch (name) {
    case "github":
      return <GithubIcon size={24} style={{ color: color }} />;
    case "linkedin":
      return <LinkedinIcon size={24} style={{ color: color }} />;
    case "twitter":
      return <TwitterIcon size={24} style={{ color: color }} />;
    default:
      return null;
  }
};

function SocialBar({
  portfolioData,
  userData,
}: {
  portfolioData: Database["public"]["Tables"]["portfolios"]["Row"];
  userData: Database["public"]["Tables"]["users"]["Row"];
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <a
        href={userData.github_link ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          backgroundColor:
            portfolioData.text_major_color ?? baseColors.text_major_color,
        }}
      >
        {getIcon(
          "github",
          portfolioData.text_minor_color ?? baseColors.text_minor_color
        )}
      </a>
      <a
        href={userData.linkedin_link ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          backgroundColor:
            portfolioData.text_major_color ?? baseColors.text_major_color,
        }}
      >
        {getIcon(
          "linkedin",
          portfolioData.text_minor_color ?? baseColors.text_minor_color
        )}
      </a>
      <a
        href={userData.twitter_link ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          backgroundColor:
            portfolioData.text_major_color ?? baseColors.text_major_color,
        }}
      >
        {getIcon(
          "twitter",
          portfolioData.text_minor_color ?? baseColors.text_minor_color
        )}
      </a>
    </div>
  );
}

export default SocialBar;
