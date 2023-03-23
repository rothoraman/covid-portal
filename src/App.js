import React, { useEffect, useState } from "react";
import "./App.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";

const App = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    state: "",
    city: "",
    cdata: "",
    sdata: "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://data.covid19india.org/v4/min/data.min.json", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelectState = (e) => {
    setState((prev) => {
      return {
        ...prev,
        state: e.target.value,
        sdata: "",
      };
    });
  };

  const onSelectCity = (e) => {
    setState((prev) => {
      return {
        ...prev,
        city: e.target.value,
        cdata: "",
      };
    });
  };

  const setStateData = (data) => {
    setState((prev) => {
      return {
        ...prev,
        sdata: data,
      };
    });
  };

  const setCityData = (data) => {
    setState((prev) => {
      return {
        ...prev,
        cdata: data,
      };
    });
  };

  return (
    <div className="main-container">
      <Container>
        {data && Object.keys(data).length > 0 ? (
          <div className="outer-container">
            <div className="header">
              <span>CORONA DASHBOARD</span>
            </div>
            <div className="input-container">
              <div className="input-col">
                <span>State</span>
                <Box sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={state.state}
                      label="Select"
                      onChange={(e) => onSelectState(e)}
                    >
                      <MenuItem disabled value="">
                        <em>Select</em>
                      </MenuItem>
                      {Object.keys(data).map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="input-col">
                <span>City</span>
                <Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label city"
                      id="demo-simple-select city"
                      onChange={(e) => onSelectCity(e)}
                      disabled={state.state === ""}
                    >
                      {state.state !== "" &&
                        Object.keys(data[state.state]?.districts).map(
                          (item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className="data-container">
              <div className="data-row">
                <div className="data-tabs">
                  {data[state.state]?.total ? (
                    <span
                      onClick={() => setStateData(data[state.state]?.total)}
                    >
                      All Variants
                    </span>
                  ) : null}
                </div>
                <div className="data">
                  {Object.keys(state.sdata).map((d, i) => (
                    <div key={i} className="data-city">
                      <span>{state.sdata[d]}</span>
                      <span> {d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="data-row">
                <div className="data-tabs">
                  {data[state.state]?.districts[state.city]?.delta7 ? (
                    <span
                      onClick={() =>
                        setCityData(
                          data[state.state]?.districts[state.city]?.delta7
                        )
                      }
                    >
                      Delta 7
                    </span>
                  ) : null}
                  {data[state.state]?.districts[state.city]?.delta21_14 ? (
                    <span
                      onClick={() =>
                        setCityData(
                          data[state.state]?.districts[state.city]?.delta21_14
                        )
                      }
                    >
                      Delta 21
                    </span>
                  ) : null}
                </div>
                <div className="data">
                  {Object.keys(state.cdata).map((d, i) => (
                    <div key={i} className="data-city">
                      <span>{state.cdata[d]}</span>
                      <span> {d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default App;
