import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function QuestionPopUp({ children, description }: { children: React.ReactNode; description: string}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        {description}
      </HoverCardContent>
    </HoverCard>
  );
}

export default QuestionPopUp;
