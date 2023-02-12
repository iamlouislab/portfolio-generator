import React from "react";
import Carousel from "./Carousel";
import { Database } from "../types/supabase";

function SectionTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl font-bold mb-5 text-indigo-600 dark:text-indigo-500 mx-5">
      {title}
    </h1>
  );
}

function SectionComponent({
  sectionInformation,
  cardsList,
}: {
  sectionInformation: Database["public"]["Tables"]["sections"]["Row"];
  cardsList: Array<Database["public"]["Tables"]["cards"]["Row"]>;
}) {
  return (
    <div>
      <div className="py-12">
        <SectionTitle title={sectionInformation.title ?? ""} />
        {cardsList.length > 0 ? (
          <Carousel>{cardsList}</Carousel>
        ) : (
          <div className="flex justify-center">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No cards found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionComponent;
