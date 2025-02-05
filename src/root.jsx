import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/authtorisation.jsx";
import Main from "./main";

const Root = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
