import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../../types/supabase";
import { useRouter } from "next/router";
import EditProfileButton from "@/components/EditProfile";
import CreateProfileButton from "@/components/CreateProfile";
import { Plus, Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { baseColors } from "@/lib/utils";

function profile() {
  const supabase = useSupabaseClient<Database>();
  const [userCreated, setUserCreated] = useState(false);

  const [portfolio, setPortfolio] = useState<
    Database["public"]["Tables"]["portfolios"]["Row"]
  >(null as unknown as Database["public"]["Tables"]["portfolios"]["Row"]);

  const [userData, setUserData] = useState<
    Database["public"]["Tables"]["users"]["Row"]
  >(null as unknown as Database["public"]["Tables"]["users"]["Row"]);

  const [userSections, setUserSections] = useState<
    Array<Database["public"]["Tables"]["sections"]["Row"]>
  >([]);

  const [userCards, setUserCards] = useState<
    Array<Database["public"]["Tables"]["cards"]["Row"]>
  >([]);

  const user = useUser();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log("user is logged in: ", user.id);
      const isUserRegistered = async () => {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", user.id)
          .single();
        if (error) {
          console.log(error);
        } else {
          if (data) {
            setUserCreated(true);

            setUserData(data as Database["public"]["Tables"]["users"]["Row"]);
            const portfolioData = await supabase
              .from("portfolios")
              .select()
              .eq("user_id", data.user_id)
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
                console.log("sections:", sectionsData.data);
                setUserSections(
                  sectionsData.data as Array<
                    Database["public"]["Tables"]["sections"]["Row"]
                  >
                );
                // get all section ids
                const sectionIds = sectionsData.data?.map(
                  (section) => section.id
                );
                console.log("sectionIds:", sectionIds);
                const cardsData = await supabase
                  .from("cards")
                  .select()
                  .in("section", [sectionIds]);
                if (error) {
                  console.log(error);
                }
                console.log("cards:", cardsData.data);
                setUserCards(
                  cardsData.data as Array<
                    Database["public"]["Tables"]["cards"]["Row"]
                  >
                );
              }
            }
          } else {
            setUserCreated(false);
          }
        }
      };
      isUserRegistered();
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [user]);

  if (!userCreated) {
    return (
      <>
        <div className="mx-auto flex w-5/6 flex-col gap-2 pt-8">
          <div className="text-6xl text-white">Hi!</div>
          <div className="text-2xl text-white">
            Welcome to your profile, here you can edit your portfolio.
          </div>
          <div className="flex w-1/2 flex-row justify-start gap-2">
            {userCreated ? (
              <EditProfileButton userData={userData} />
            ) : (
              <CreateProfileButton />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-5/6 flex-col gap-2 pt-8">
        <div className="text-6xl text-white">Hi!</div>
        <div className="text-2xl text-white">
          Welcome to your profile, here you can edit your portfolio.
        </div>
        <div className="flex w-1/2 flex-row justify-start gap-2">
          <CreateCardButton user_id={user?.id ?? ""} sections={userSections} />
          {/* user should never be null */}
          <CreateSectionButton
            user_id={user?.id ?? ""}
            portfolio_id={portfolio?.id ?? ""}
          />
          {userCreated ? (
            <EditProfileButton userData={userData} />
          ) : (
            <CreateProfileButton />
          )}
          <EditColorButton portfolioData={portfolio} />
        </div>
      </div>
      <div className="mx-auto flex w-5/6 flex-col gap-10 pt-8">
        <div className="text-2xl text-white">
          <div className="mb-2 text-2xl text-white">Your sections</div>
          <div className="flex flex-col gap-2">
            <SectionRowHeader />
            {userSections.map((section, index) => (
              <SectionRow section={section} key={index} />
            ))}
          </div>
        </div>

        <div className="text-2xl text-white">
          <div className="mb-2 text-2xl text-white">Your cards</div>
          <div className="flex flex-col gap-2">
            <CardRowHeader />
            {userCards.map((card, index) => (
              <CardRow card={card} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const SectionRowHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
      <div className="flex flex-row">
        <div className="ml-2">Title</div>
        <div className="ml-2">Description</div>
        <div className="ml-2">Cards</div>
      </div>
      <div className="flex flex-row gap-2 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
        <div className="mr-2">Actions</div>
      </div>
    </div>
  );
};

const CardRowHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
      <div className="flex flex-row">
        <div className="ml-2">Title</div>
        <div className="ml-2">Description</div>
        <div className="ml-2">Keywords</div>
      </div>
      <div className="flex flex-row gap-2 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
        <div className="mr-2">Actions</div>
      </div>
    </div>
  );
};

const SectionRow = ({
  section,
}: {
  section: Database["public"]["Tables"]["sections"]["Row"];
}) => {
  const [cards, setCards] = useState<
    Array<Database["public"]["Tables"]["cards"]["Row"]>
  >([]);
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    const getCards = async () => {
      const { data, error } = await supabase
        .from("cards")
        .select()
        .eq("section", section.id);
      if (error) {
        console.log(error);
      } else {
        setCards(data as Array<Database["public"]["Tables"]["cards"]["Row"]>);
      }
    };
    getCards();
  }, []);

  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-slate-100 py-2 text-2xl text-black">
      <div className="flex flex-row items-start">
        <div className="ml-2">{section.title}</div>
        <div className="ml-2">{section.description}</div>
        <div className="ml-2">{cards.length} cards</div>
      </div>
      <div className="flex flex-row items-center gap-2 rounded bg-slate-100 py-2 text-2xl text-black">
        <button className="mr-2">
          <EditSectionButton section={section} />
        </button>
        <div className="mr-2">
          <DeleteSectionButton section={section} />
        </div>
      </div>
    </div>
  );
};

const CardRow = ({
  card,
}: {
  card: Database["public"]["Tables"]["cards"]["Row"];
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-slate-100 py-2 text-2xl text-black">
      <div className="flex flex-row items-start">
        <div className="ml-2">{card.title}</div>
        <div className="ml-2">{card.description}</div>
        <div className="ml-2">{card.keywords?.toString()}</div>
      </div>
      <div className="flex flex-row items-center gap-2 rounded bg-slate-100 py-2 text-2xl text-black">
        <button className="mr-2">
          <EditCardButton card={card} />
        </button>
        <div className="mr-2">
          <DeleteCardButton card={card} />
        </div>
      </div>
    </div>
  );
};

const EditSectionButton = ({
  section,
}: {
  section: Database["public"]["Tables"]["sections"]["Row"];
}) => {
  const supabase = useSupabaseClient<Database>();

  const [title, setTitle] = useState<string>(section.title as string);
  const [description, setDescription] = useState<string>(
    section.description as string
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const editSection = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setLoading(true);
    console.log("Editing section with id: ", section.id);
    const { error } = await supabase
      .from("sections")
      .update({ title: title, description: description })
      .eq("id", section.id);
    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      console.log("Edited");
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit section</DialogTitle>
          <DialogDescription>
            Update your section's title and description.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && (
              <div className="text-sm text-green-500">
                Section edited successfully
              </div>
            )}
            {loading ? (
              <ButtonLoading text="Editing section..." />
            ) : (
              <Button
                type="submit"
                onClick={() =>
                  editSection({
                    title,
                    description,
                  })
                }
              >
                Update section
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditCardButton = ({
  card,
}: {
  card: Database["public"]["Tables"]["cards"]["Row"];
}) => {
  const supabase = useSupabaseClient<Database>();

  const [title, setTitle] = useState<string>(card.title as string);
  const [description, setDescription] = useState<string>(
    card.description as string
  );
  const [keywords, setKeywords] = useState<string[]>(card.keywords as string[]);
  const [link, setLink] = useState<string>(card.link as string);

  const [sections, setSections] = useState<
    Database["public"]["Tables"]["sections"]["Row"][]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [selectedSectionId, setSelectedSectionId] = useState<number>(0);

  const editCard = async ({
    title,
    description,
    keywords,
    link,
  }: {
    title: string;
    description: string;
    keywords: string[];
    link: string;
  }) => {
    console.log("Editing card with id: ", card.id);
    setLoading(true);
    const { data, error } = await supabase
      .from("cards")
      .update({
        title: title,
        description: description,
        keywords: keywords,
        section: selectedSectionId,
      })
      .eq("id", card.id)
      .select();
    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      setSuccess("Card edited successfully");
    }
    setLoading(false);
  };

  useEffect(() => {
    const getSections = async () => {
      const { data, error } = await supabase
        .from("sections")
        .select()
        .order("id", { ascending: true });
      if (error) {
        console.log(error);
      } else {
        setSections(data as Database["public"]["Tables"]["sections"]["Row"][]);
      }
    };
    getSections();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit card</DialogTitle>
          <DialogDescription>
            Update your card's title, description, keywords, link, image and
            section.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-white">
              Description
            </Label>
            <Input
              id="title"
              value={description}
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keywords" className="text-right text-white">
              Keywords (separated by commas)
            </Label>
            <Input
              id="keywords"
              value={keywords.join(",")}
              className="col-span-3"
              onChange={(e) => {
                setKeywords(e.target.value.split(","));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keywords" className="text-right text-white">
              Link (when the card is clicked)
            </Label>
            <Input
              id="link"
              value={link}
              className="col-span-3"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right text-white">
              Section (choose from existing ones)
            </Label>
            <Select
              onValueChange={(value) => setSelectedSectionId(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <div key={section.id}>
                    <SelectItem value={section.id as unknown as string}>
                      {section.title}
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-500">{success}</div>}
            {loading ? (
              <ButtonLoading text="Editing card..." />
            ) : (
              <Button
                type="submit"
                onClick={() =>
                  editCard({
                    title,
                    description,
                    keywords,
                    link,
                  })
                }
              >
                Update card
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DeleteSectionButton = ({
  section,
}: {
  section: Database["public"]["Tables"]["sections"]["Row"];
}) => {
  const supabase = useSupabaseClient<Database>();

  const deleteSection = async () => {
    console.log("Deleting section with id: ", section.id);
    const { error } = await supabase
      .from("sections")
      .delete()
      .eq("id", section.id);
    if (error) {
      console.log(error);
    } else {
      console.log("Deleted");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            section from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteSection()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const DeleteCardButton = ({
  card,
}: {
  card: Database["public"]["Tables"]["cards"]["Row"];
}) => {
  const supabase = useSupabaseClient<Database>();

  const deleteCard = async () => {
    console.log("Deleting card with id: ", card.id);
    const { error } = await supabase.from("cards").delete().eq("id", card.id);
    if (error) {
      console.log(error);
    } else {
      console.log("Deleted");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            section from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteCard()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CreateCardButton = ({
  user_id,
  sections,
}: {
  user_id: string;
  sections: Database["public"]["Tables"]["sections"]["Row"][];
}) => {
  const supabase = useSupabaseClient<Database>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );

  const createCard = async ({
    title,
    description,
    image,
    keywords,
  }: {
    title: string;
    description: string;
    image: File | null;
    keywords: string[];
  }) => {
    setLoading(true);

    if (!selectedSectionId) {
      setError("Please select a section");
      setLoading(false);
      return;
    }

    // uploading image
    if (image) {
      const storageData = await supabase.storage
        .from("profile-pictures")
        .upload(`${user_id}/card-${title}.png`, image);

      if (storageData.error) {
        console.log(storageData.error);
        setError("Error uploading image: " + storageData.error.message);
      } else {
        console.log("Uploaded image");
      }
    }

    console.log("Creating card with title: ", title);
    const { error } = await supabase.from("cards").insert({
      title: title,
      description: description,
      keywords: keywords,
      user_id: user_id,
      section: selectedSectionId,
    });
    if (error) {
      console.log(error);
    } else {
      console.log("Created");
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black">
          Create card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create card</DialogTitle>
          <DialogDescription>Create a new card.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Description
            </Label>

            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keywords" className="text-right text-white">
              Keywords (separated by commas)
            </Label>
            <Input
              id="keywords"
              value={keywords}
              className="col-span-3"
              onChange={(e) => {
                setKeywords(e.target.value.split(","));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="banner_image" className="text-right text-white">
              Image
            </Label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setImage(e.target.files ? e.target.files[0] : null);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right text-white">
              Section (choose from existing ones)
            </Label>
            <Select
              onValueChange={(value) => setSelectedSectionId(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <div key={section.id}>
                    <SelectItem value={section.id as unknown as string}>
                      {section.title}
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Success!</p>}
            {loading ? (
              <ButtonLoading text="Creating card..." />
            ) : (
              <Button
                type="submit"
                onClick={() =>
                  createCard({ title, description, image, keywords })
                }
              >
                Create card
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateSectionButton = ({
  user_id,
  portfolio_id,
}: {
  user_id: string;
  portfolio_id: number;
}) => {
  const supabase = useSupabaseClient<Database>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createSection = async ({
    title,
    description,
    user_id,
  }: {
    title: string;
    description: string;
    user_id: string;
  }) => {
    setLoading(true);
    const { error } = await supabase.from("sections").insert({
      title: title,
      description: description,
      user_id: user_id,
      portfolio: portfolio_id,
    });
    if (error) {
      console.log(error);
      setError("Error creating section: " + error.message);
    } else {
      console.log("Created");
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black">
          Create section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create section</DialogTitle>
          <DialogDescription>Create a new section.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Success!</p>}
            {loading ? (
              <ButtonLoading text="Creating section..." />
            ) : (
              <Button
                type="submit"
                onClick={() => createSection({ title, description, user_id })}
              >
                Create section
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditColorButton = ({
  portfolioData,
}: {
  portfolioData: Database["public"]["Tables"]["portfolios"]["Row"];
}) => {
  console.log("portfolio Edit color button", portfolioData);
  const [background_color, setBackgroundColor] = useState<string>(
    portfolioData?.background_color || baseColors.background_color
  );
  const [text_major_color, setTextMajorColor] = useState<string>(
    portfolioData?.text_major_color || baseColors.text_major_color
  );
  const [text_color_minor, setTextColorMinor] = useState<string>(
    portfolioData?.text_minor_color || baseColors.text_minor_color
  );
  const [text_minor_2_color, setTextColorMinor2] = useState<string>(
    portfolioData?.text_minor_2_color || baseColors.text_minor_2_color
  );

  const supabase = useSupabaseClient<Database>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateColors = async ({
    background_color,
    text_major_color,
    text_color_minor,
    text_minor_2_color,
  }: {
    background_color: string;
    text_major_color: string;
    text_color_minor: string;
    text_minor_2_color: string;
  }) => {
    setLoading(true);
    const { error } = await supabase
      .from("portfolios")
      .update({
        background_color: background_color,
        text_major_color: text_major_color,
        text_minor_color: text_color_minor,
        text_minor_2_color: text_minor_2_color,
      })
      .eq("id", portfolioData.id);
    if (error) {
      console.log(error);
      setError("Error updating colors: " + error.message);
    } else {
      console.log("Updated");
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black">
          Edit colors
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit colors</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="background_color" className="text-right text-white">
              Background color
            </Label>
            <div className="flex flex-row">
              <div
                className="col-span-3 h-10 w-10 rounded"
                style={{
                  backgroundColor: background_color,
                }}
              ></div>
              <ColorPicker
                initialColor={background_color}
                onChange={(color) => setBackgroundColor(color)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text_color" className="text-right text-white">
              Text major color
            </Label>
            <div className="flex flex-row">
              <div
                className="col-span-3 h-10 w-10 rounded"
                style={{
                  backgroundColor: text_major_color,
                }}
              ></div>
              <ColorPicker
                initialColor={text_major_color}
                onChange={(color) => setTextMajorColor(color)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text_color_minor" className="text-right text-white">
              Text color minor
            </Label>
            <div className="flex flex-row">
              <div
                className="col-span-3 h-10 w-10 rounded"
                style={{
                  backgroundColor: text_color_minor,
                }}
              ></div>
              <ColorPicker
                initialColor={text_color_minor}
                onChange={(color) => setTextColorMinor(color)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="text_color_minor_2"
              className="text-right text-white"
            >
              Text color minor 2
            </Label>
            <div className="flex flex-row">
              <div
                className="col-span-3 h-10 w-10 rounded"
                style={{
                  backgroundColor: text_minor_2_color,
                }}
              ></div>
              <ColorPicker
                initialColor={text_minor_2_color}
                onChange={(color) => setTextColorMinor2(color)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Success!</p>}
            {loading ? (
              <ButtonLoading text="Updating colors..." />
            ) : (
              <Button
                type="submit"
                onClick={() =>
                  updateColors({
                    background_color,
                    text_major_color,
                    text_color_minor,
                    text_minor_2_color,
                  })
                }
              >
                Update colors
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ColorPicker = ({
  initialColor,
  onChange,
}: {
  initialColor: string;
  onChange: (color: string) => void;
}) => {
  const [color, setColor] = useState(initialColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="h-8 w-12 rounded border border-white"
        style={{ backgroundColor: color }}
      ></div>
      <Button variant="outline" onClick={handleClick}>
        Choose color
      </Button>
      {displayColorPicker ? (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={handleClose}></div>
          <SketchPicker color={color as any} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default profile;
