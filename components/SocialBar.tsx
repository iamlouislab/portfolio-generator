import React from "react";
import { LinkedinIcon, GithubIcon } from "lucide-react";
import { Database } from "@/types/supabase";

const getIcon = (name: string, color: string) => {
  switch (name) {
    case "github":
      return <GithubIcon size={24} style={{ color: color }} />;
    case "linkedin":
      return <LinkedinIcon size={24} style={{ color: color }} />;
    default:
      return null;
  }
};

function SocialBar({
  socialsList,
  portfolioData,
}: {
  socialsList: Array<string>;
  portfolioData: Database["public"]["Tables"]["portfolios"]["Row"];
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      {socialsList.map((social, index) => (
        <a
          key={index}
          href={social}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: portfolioData.text_major_color ?? "black" }}
        >
          {getIcon(social, portfolioData.text_minor_color ?? "white")}
        </a>
      ))}
    </div>
  );
}

export default SocialBar;
