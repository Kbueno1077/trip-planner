"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Chat() {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      router.refresh();
      return;
    }

    // Navigate to create trip page
  };

  return (
    <div className="relative rounded-2xl border p-3 sm:p-4">
      <Textarea
        placeholder="Create a trip for Paris from New York"
        className="h-28 w-full resize-none bg-transparent shadow-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <Button
        size="icon"
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4"
        onClick={onSend}
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Chat;
