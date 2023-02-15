import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import ButtonLoading from "./ButtonLoading";

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

function createProfileButton(): React.ReactNode {
  const supabase = useSupabaseClient<Database>();
  const [userCreated, setUserCreated] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [displayedName, setDisplayedName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [dbLoading, setDbLoading] = useState(false);
  const [error, setError] = useState(null as string | null);
  const [success, setSuccess] = useState(false);

  const user = useUser();

  const createUser = async ({
    username,
    displayedName,
  }: {
    username: string;
    displayedName: string;
  }) => {
    if (!user) return;
    setDbLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        // No user found
        const { data, error } = await supabase.from("users").insert([
          {
            user_id: user.id,
            username: username,
            displayed_name: displayedName,
          },
        ]);
        if (error) {
          if (error.message.includes("unique constraint")) {
            // Username already exists
            setError("Username already exists");
          }
        } else {
          // Create portfolio
          const { data, error } = await supabase.from("portfolios").insert([
            {
              user_id: user.id,
            },
          ]);
          if (error) {
            console.log(error);
          } else {
            setUserCreated(true);
            setSuccess(true);
          }
        }
      }
    } else {
      if (data) {
        // User already exists
        setUserCreated(true);
      } else {
        const { data, error } = await supabase.from("users").insert([
          {
            user_id: user.id,
            username: username,
            displayed_name: displayedName,
          },
        ]);
        if (error) {
          if (error.message.includes("unique constraint")) {
            // Username already exists
            setError("Username already exists");
          }
        } else {
          // Create portfolio
          const { data, error } = await supabase.from("portfolios").insert([
            {
              user_id: user.id,
            },
          ]);
          if (error) {
            console.log(error);
          } else {
            setUserCreated(true);
            setSuccess(true);
          }
          setUserCreated(true);
          setSuccess(true);
        }
      }
    }
    setDbLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black">
          Create Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create profile</DialogTitle>
          <DialogDescription>
            Create your profile to get started with your portfolio. Choose a
            username that will be visible to everyone and choose the name that
            will be displayed on your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-white">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
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
              placeholder="John Doe"
              className="col-span-3"
              onChange={(e) => {
                setDisplayedName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            <div>{error && <p className="text-red-500">{error}</p>}</div>
            <div>{success && <p className="text-green-500">Success</p>}</div>
            {dbLoading ? (
              <ButtonLoading text="Creating profile..." />
            ) : (
              <Button
                type="submit"
                onClick={() => createUser({ username, displayedName })}
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

export default createProfileButton;
