
"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_COOKIE = "lamsa_theme";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((item) => item.startsWith(`${THEME_COOKIE}=`));

    const savedTheme = cookie?.split("=")[1];

    const initialTheme: Theme =
      savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );

    // Save the theme for 1 year.
    document.cookie = `${THEME_COOKIE}=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;

    setTheme(nextTheme);
  };

  return { theme, toggleTheme, mounted };
}
