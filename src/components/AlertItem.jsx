import React, { useState } from "react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertItem = ({ additionalClass }) => {
  const [stateClass, setStateClass] = useState(additionalClass);

  setInterval(() => {
    setStateClass("hiddenPers");
  }, 3000);

  return (
    <Alert
      className={
        "fixed top-1 right-1 max-w-md transition-transform duration-1000 ease-in-out " +
        stateClass
      }
    >
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};

export default AlertItem;
