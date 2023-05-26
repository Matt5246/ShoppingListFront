import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBMI] = useState<number | null>(null);
  const [gender, setGender] = useState("male");
  const [error, setError] = useState<string | null>(null);

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(event.target.value);
    setWeight(weight);
  };

  const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const height = parseFloat(event.target.value);
    setHeight(height);
  };

  const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const calculateBMI = () => {
    if (weight <= 0 || height <= 0) {
      setBMI(null);
      setError("Please enter valid weight and height values.");
      return;
    }

    const heightInMeters = height / 100; // Convert height from cm to meters
    let bmi: number;

    if (gender === "male") {
      bmi = weight / Math.pow(heightInMeters, 2);
    } else {
      bmi = weight / Math.pow(heightInMeters, 2) - 1;
    }

    setBMI(bmi);
    localStorage.setItem("bmi", bmi.toString());
    setError(null);
  };

  const getBMIState = (bmi: number | null): string => {
    if (bmi === null) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="container mt-5">
      <Typography variant="h4" gutterBottom>
        BMI Calculator
      </Typography>
      <div>
        <TextField
          label="Weight (kg)"
          type="number"
          value={weight}
          onChange={handleWeightChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Height (cm)"
          type="number"
          value={height}
          onChange={handleHeightChange}
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={calculateBMI}>
          Calculate BMI
        </Button>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {bmi !== null && (
          <Typography variant="h5" gutterBottom>
            BMI: {bmi.toFixed(2)} ({getBMIState(bmi)})
          </Typography>
        )}
      </div>
      {bmi !== null && (
        <img
          alt="BMI Chart"
          className="container mt-2"
          src="https://cdn.vertex42.com/ExcelTemplates/Images/bmi-chart.gif"
        />
      )}
    </div>
  );
};
