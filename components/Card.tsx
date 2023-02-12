import { Database } from "../types/supabase";

function ProjectItem(
  cardInformation: Database["public"]["Tables"]["cards"]["Row"]
) {
  return (
    <div className="bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg overflow-hidden hover:-translate-y-2 transform h-[330px] transition mt-5 mx-5">
      <a href={"/"}>
        <img
          src={cardInformation.image ?? ""}
          alt={cardInformation.title ?? ""}
          className="w-full h-36 md:h-48 object-cover"
        />
        <div className="text-gray-600 dark:text-gray-300 p-5 w-full">
          <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-semibold">
            {cardInformation.title}
          </h3>
          <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm">
            {cardInformation.keywords &&
              Array.isArray(cardInformation.keywords) &&
              cardInformation.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-slate-200 dark:bg-slate-900 rounded-md"
                >
                  {keyword as string}
                </span>
              ))}
          </p>
        </div>
      </a>
    </div>
  );
}

export default ProjectItem;
