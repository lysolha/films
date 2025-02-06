import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const AlertItem = ({ variant, title, description, resetAlert }) => {
  const [stateClass, setStateClass] = useState("hiddenCustom");

  useEffect(() => {
    const interval1 = setTimeout(() => {
      setStateClass("open");
    }, 100);
    const interval = setTimeout(() => {
      setStateClass("hiddenCustom");
    }, 4000);
    const interval3 = setTimeout(() => {
      resetAlert();
    }, 5000);
    return () => {
      clearTimeout(interval);
      clearTimeout(interval1);
      clearTimeout(interval3);
    };
  }, []);

  return (
    <Alert
      variant={variant}
      className={`fixed right-1 top-1 max-w-md bg-white ${stateClass}`}
    >
      {variant === "default" ? (
        <Terminal className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}

      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertItem;
