import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchProfile() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="Profile" placeholder="Username" />
      <Button type="submit">Search</Button>
    </div>
  );
}
