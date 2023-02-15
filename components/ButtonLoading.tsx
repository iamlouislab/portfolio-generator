import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ButtonLoading({ text }: { text: string }) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </Button>
  );
}

export default ButtonLoading;
