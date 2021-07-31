import Country from "./component/Country/Country";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import "./App.css";

import { Button } from "react-bootstrap";
import LanguageStatic from "./component/Language/Language";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./component/DarkMode/globalStyles";
import { lightTheme, darkTheme } from "./component/DarkMode/Themes";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import BounceLoader from "react-spinners/BounceLoader";
import {FaSun} from 'react-icons/fa'
const API_URL = "https://restcountries.eu/rest/v2/all";
const override = css`
  display: block;
  margin: 0 auto;
  position: relative;
  opacity: 2.5;
  border: 4px;
  top: 0;
  left: 0;
  animation-fill-mode: both;
`;
function App() {
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const [countrySelected, setCountrySelected] = useState(true);
  const [data, setData] = useState({ countries: [] });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    axios.get(API_URL).then((data) => {
      setData({
        countries: data,
      });
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <BounceLoader
          color={"#055052"}
          loading={loading}
          size={250}
          css={override}
        />
      ) : (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <>
            <GlobalStyles />
            <FaSun size="25px" className="mx-3"/>

            <BootstrapSwitchButton
              onChange={themeToggler}
              size="sm"
              onstyle="dark"
              offstyle="light"
              style="border"
              className="py-3 mt2"
              onlabel="Dark"
              offlabel="Light"
              
              
            ></BootstrapSwitchButton>

            <div className=" mr-3 text-center py-2 mb-3">
              <Button
              size='lg'
                variant="info"
                className="mt-3 py-3 mx-2 "
                onClick={() => setCountrySelected(true)}
              >
                Countries
              </Button>
              <Button
                variant="light"
                size='lg'
                className="mt-3 py-3 mx-2"
                onClick={() => setCountrySelected(false)}
              >
               Statistics
              </Button>
              {countrySelected && <Country />}
              {!countrySelected && <LanguageStatic />}
            </div>
          </>
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
