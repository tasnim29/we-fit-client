import { useContext, useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

export default function DarkMode() {
  const { setTheme, theme } = useContext(AuthContext);
  const [darkSide, setDarkSide] = useState(theme === "dark");

  const toggleDarkMode = (checked) => {
    const nextTheme = checked ? "dark" : "light";
    setTheme(nextTheme);
    setDarkSide(checked);
  };

  useEffect(() => {
    setDarkSide(theme === "dark");
  }, [theme]);

  return (
    <DarkModeSwitch
      style={{ marginBottom: "0" }}
      checked={darkSide}
      onChange={toggleDarkMode}
      size={25}
      sunColor="#facc15"
      moonColor="#e2e8f0"
    />
  );
}
