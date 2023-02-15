import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

export function SearchProfile() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="Profile"
        placeholder="Username"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button
        type="submit"
        onClick={() => {
          router.push(`/profile/${search}`);
        }}
      >
        Search
      </Button>
    </div>
  );
}
