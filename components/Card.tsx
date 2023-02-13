import { useState } from "react";
import { Database } from "../types/supabase";

function Card({
  cardInformation,
  portfolioData,
}: {
  cardInformation: Database["public"]["Tables"]["cards"]["Row"];
  portfolioData: Database["public"]["Tables"]["portfolios"]["Row"];
}) {
  const initialColor =
    portfolioData.card_color === null || portfolioData.card_color === ""
      ? "black"
      : portfolioData.card_color;
  const [color, setColor] = useState(initialColor);

  const hoveredColor =
    portfolioData.card_color_hover === null ||
    portfolioData.card_color_hover === ""
      ? "gray"
      : portfolioData.card_color_hover;

  return (
    <div
      className="mx-5 mt-5 h-[330px] transform overflow-hidden rounded-lg transition hover:-translate-y-2"
      style={{
        color: portfolioData.background_color ?? "white",
        backgroundColor: color ?? color,
      }}
      onMouseEnter={() => setColor(hoveredColor)}
      onMouseLeave={() => setColor(initialColor)}
    >
      <a href={"/"}>
        <img
          src={cardInformation.image ?? ""}
          alt={cardInformation.title ?? ""}
          className="h-36 w-full object-cover md:h-48"
        />
        <div className="w-full p-5">
          <h3
            className="mb-2 text-lg font-semibold md:mb-3 md:text-xl"
            style={{ color: portfolioData.text_minor_color ?? "white" }}
          >
            {cardInformation.title}
          </h3>
          <p className="mb-2 text-sm md:mb-3 md:text-base">
            {cardInformation.description}
          </p>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm">
            {cardInformation.keywords &&
              Array.isArray(cardInformation.keywords) &&
              cardInformation.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-block rounded-md px-2 py-1"
                  style={{
                    backgroundColor: portfolioData.background_color ?? "white",
                    color: portfolioData.text_major_color ?? "black",
                  }}
                >
                  {keyword as string}
                </span>
              ))}
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;
