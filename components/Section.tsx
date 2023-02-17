import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { Database } from "../types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Card from "./Card";
import { baseColors } from "@/lib/utils";

const SectionComponent = ({
  sectionInformation,
  portfolioData,
}: {
  sectionInformation: Database["public"]["Tables"]["sections"]["Row"];
  portfolioData: Database["public"]["Tables"]["portfolios"]["Row"];
}) => {
  const [cardsList, setCardsList] = useState<
    Array<Database["public"]["Tables"]["cards"]["Row"]>
  >([]);
  const [cardsComponentList, setCardsComponentList] = useState<
    Array<React.ReactNode>
  >([]);

  const supabase = useSupabaseClient<Database>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("section.id in useEffect: ", sectionInformation.id);
    const getCards = async () => {
      const { data, error } = await supabase
        .from("cards")
        .select()
        .eq("section", sectionInformation.id);
      if (error) {
        console.log(error);
      }
      console.log("CardsData: ", data);
      setCardsList(data as Array<Database["public"]["Tables"]["cards"]["Row"]>);

      // build the list of cards components
      const cardsComponentList = data?.map((card) => {
        return <Card cardInformation={card} portfolioData={portfolioData} />;
      });
      setCardsComponentList(cardsComponentList as Array<React.ReactNode>);
      setLoading(false);
    };
    getCards();
  }, []);

  return (
    <div>
      <div className="py-12">
        <h1
          className="mx-5 text-3xl font-bold"
          style={{ color: portfolioData.text_major_color ?? baseColors.text_major_color }}
        >
          {sectionInformation.title}
        </h1>
        <p
          className="mx-5"
          style={{ color: portfolioData.text_minor_color ?? baseColors.text_minor_color }}
        >
          {sectionInformation.description}
        </p>

        {cardsList.length > 0 ? (
          <Carousel>{cardsComponentList}</Carousel>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SectionComponent;
