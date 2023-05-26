import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./assets/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBackgroundColor } from "./features/background/backgroundSlice";
import { ShoppingList } from "./components/ShoppingList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BMICalculator } from "./components/BMICalculator";
import About from "./components/About";

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const backgroundColor = useSelector(selectBackgroundColor);

  useEffect(() => {
    if (backgroundColor === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
    localStorage.setItem("Theme", backgroundColor);
  }, [backgroundColor]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />

        <Routes>
          <Route path="/*" element={<ShoppingList />} />
          <Route path="/About" element={<About />} />
          <Route path="/BMICalculator" element={<BMICalculator />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
