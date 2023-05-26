import { toggleBackgroundColor } from "../features/background/backgroundSlice";
import { SettingsList } from "../types";
import { useDispatch } from "react-redux";
import { MenuItem } from "@mui/material";
import { Typography } from "@mui/material";

function Settings() {
  // use the settings object here
  const dispatch = useDispatch();
  const bmi = localStorage.getItem("bmi") || null;

  const settings: SettingsList = [
    {
      name: "Theme",
      key: "theme",
      action: () => dispatch(toggleBackgroundColor()),
    },
  ];
  if (bmi) {
    const formattedBmi = parseFloat(bmi).toFixed(2);
    settings.push({
      name: `BMI: ${formattedBmi}`,
      key: "bmi",
      action: () => {},
    });
  }
  return (
    <>
      {settings.map(setting => (
        <MenuItem key={setting.key} onClick={setting.action}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      ))}
    </>
  );
}
export default Settings;
