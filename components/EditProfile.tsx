import React, { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";
import { useRouter } from "next/router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonLoading from "./ButtonLoading";

function EditProfileButton({
  userData,
}: {
  userData: Database["public"]["Tables"]["users"]["Row"];
}) {
  const supabase = useSupabaseClient<Database>();
  const [userCreated, setUserCreated] = useState(false);

  const [username, setUsername] = useState<string>(userData.username ?? "");
  const [displayedName, setDisplayedName] = useState<string>(
    userData.displayed_name ?? ""
  );
  const [description, setDescription] = useState<string>(
    userData.description ?? ""
  );
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [githubLink, setGithubLink] = useState<string>(
    userData.github_link ?? ""
  );

  const [twitterLink, setTwitterLink] = useState<string>(
    userData.twitter_link ?? ""
  );

  const [linkedinLink, setLinkedinLink] = useState<string>(
    userData.linkedin_link ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [dbLoading, setDbLoading] = useState(false);
  const [error, setError] = useState(null as string | null);
  const [success, setSuccess] = useState(false);

  const user = useUser();

  const router = useRouter();

  const updateUser = async ({
    username,
    displayedName,
    description,
    profilePicture,
    githubLink,
    twitterLink,
    linkedinLink,
  }: {
    username: string;
    displayedName: string;
    description: string;
    profilePicture: File | null;
    githubLink: string;
    twitterLink: string;
    linkedinLink: string;
  }) => {
    if (!user) return;
    setDbLoading(true);

    // uploading profile picture to supabase storage
    if (profilePicture) {
      // Check if user already has a profile picture

      console.log("updating");
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .update(`${user.id}/profile_picture`, profilePicture);
      if (error) {
        console.log("error updating");
        console.log("uploading");
        const { data, error } = await supabase.storage
          .from("profile-pictures")
          .upload(`${user.id}/profile_picture`, profilePicture);
        if (error) {
          console.log(error);
          setError("Error uploading profile picture");
        }
      } else {
        setDbLoading(false);
      }
    }

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id)
      .single();
    if (error) {
      console.log(error);
    } else {
      if (data) {
        // User already exists
        const { data, error } = await supabase
          .from("users")
          .update({
            username: username,
            displayed_name: displayedName,
            description: description,
            github_link: githubLink,
            twitter_link: twitterLink,
            linkedin_link: linkedinLink,
          })
          .eq("user_id", user.id);
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      } else {
        const { data, error } = await supabase.from("users").insert([
          {
            user_id: user.id,
            username: username,
            displayed_name: displayedName,
            description: description,
            github_link: githubLink,
            twitter_link: twitterLink,
            linkedin_link: linkedinLink,
          },
        ]);
        if (error) {
          if (error.message.includes("unique constraint")) {
            // Username already exists
            setError("Username already exists");
          }
        } else {
          setUserCreated(true);
        }
      }
    }
    setDbLoading(false);
    setSuccess(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Edit your profile.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-white">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              className="col-span-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayed_name" className="text-right text-white">
              Displayed Name
            </Label>
            <Input
              id="displayed_name"
              value={displayedName}
              className="col-span-3"
              onChange={(e) => {
                setDisplayedName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-white">
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
            <Label htmlFor="github" className="text-right text-white">
              Github Profile Link
            </Label>
            <Input
              id="github"
              value={githubLink}
              className="col-span-3"
              onChange={(e) => {
                setGithubLink(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="twitter" className="text-right text-white">
              Twitter Profile Link
            </Label>
            <Input
              id="twitter"
              value={twitterLink}
              className="col-span-3"
              onChange={(e) => {
                setTwitterLink(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="linkedin" className="text-right text-white">
              Linkedin Profile Link
            </Label>
            <Input
              id="linkedin"
              value={linkedinLink}
              className="col-span-3"
              onChange={(e) => {
                setLinkedinLink(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Profile Picture" className="text-right text-white">
              Profile Picture
            </Label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setProfilePicture(e.target.files ? e.target.files[0] : null);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            <div>{error && <p className="text-red-500">{error}</p>}</div>
            <div>{success && <p className="text-green-500">Success</p>}</div>
            {dbLoading ? (
              <ButtonLoading text="Updating..." />
            ) : (
              <Button
                type="submit"
                onClick={() =>
                  updateUser({
                    username,
                    displayedName,
                    description,
                    profilePicture,
                    githubLink,
                    twitterLink,
                    linkedinLink,
                  })
                }
              >
                Create
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileButton;
