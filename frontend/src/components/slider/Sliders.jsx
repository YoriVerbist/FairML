import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function Sliders({ patients }) {
  const valuetext = "";
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Importance"
          defaultValue={30}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={5}
          step={1}
          marks
          min={0}
          max={5}
        />
      </Box>
    </>
  );
}
