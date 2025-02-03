import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";
import "./Prediction.css";
const weather = [
  {
    value: "0",
    label: "clear",
  },
  {
    value: "1",
    label: "fog",
  },
  {
    value: "2",
    label: "rain",
  },
];
const roadtype = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
];

export default function Prediction() {
  let [longi, setLongi] = useState("");
  let [lati, setLati] = useState("");
  let [time, setTime] = useState("");
  let [weath, setWeath] = useState("");
  let [roadt, setRoadt] = useState("");
  let [error, setError] = useState(false);
  let getWeatherInfo = async () => {
    try {
      setError(false);

      let result = {
        longi: longi,
        lati: lati,
        time: time,
        weath: weath,
        roadt: roadt,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };
  let handlelongi = (evt) => {
    setLongi(evt.target.value);
  };
  let handlelati = (evt) => {
    setLati(evt.target.value);
  };
  let handletime = (evt) => {
    setTime(evt.target.value);
  };
  let handleweath = (evt) => {
    setWeath(evt.target.value);
  };
  let handleroadt = (evt) => {
    setRoadt(evt.target.value);
  };
  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(weath);
      setWeath("");
      let newInfo = await getWeatherInfo();
      console.log(newInfo);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <div className="predict">
        <form onSubmit={handleSubmit}>
          <h3>Enter your location</h3>
          <h5>latitude</h5>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={lati}
            defaultValue="12.46''"
            onChange={handlelati}
          />
          <h5>longitude</h5>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="77.30''"
            value={longi}
            onChange={handlelongi}
          />
          <h5>time</h5>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="1 to 24"
            value={time}
            onChange={handletime}
          />
          <h5>Weather</h5>
          <TextField
            id="weather"
            select
            label="weather"
            defaultValue="0"
            value={weath}
            onChange={handleweath}
            helperText="Please select weather condition"
          >
            {weather.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <h5>Road_type</h5>
          <TextField
            id="road"
            select
            label="road"
            defaultValue="0"
            value={roadt}
            onChange={handleroadt}
            helperText="Please select road condition"
          >
            {roadtype.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          {error && (
            <p style={{ color: "red", fontWeight: "700" }}>cant predict</p>
          )}
        </form>
      </div>
    </>
  );
}
