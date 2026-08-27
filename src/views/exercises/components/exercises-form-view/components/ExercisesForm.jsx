import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useTranslate } from "../../../../../hooks/useTranslate";
import MuiDropzone from "../../../../../components/dropzone/DropZone";
import useGetExercisesKeys from "../../../../../hooks/useGetExercisesKeys";

const ExercisesForm = ({
  mode = "add",
  muscleGroupsResult,
  equipmentResult,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { translate } = useTranslate();
  const { values, setFieldValue } = useFormikContext();

  const exercisesKeysOptions = useGetExercisesKeys();

  const formTitle = mode === "add" ? "add_new_exercise" : "edit_exercise";

  return (
    <Box sx={{ p: 2, height: "100%", boxSizing: "border-box" }}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        {isMobile && (
          <Box>
            <Typography variant="h6">{translate(formTitle)}</Typography>
          </Box>
        )}

        <TextField
          label={translate("name")}
          name="name"
          onChange={(e) => setFieldValue("name", e.target.value)}
          fullWidth
        />

        <Autocomplete
          fullWidth
          disablePortal
          options={exercisesKeysOptions}
          sx={{ width: 300 }}
          onChange={(__, option) => {
            setFieldValue("key", option?.value);
          }}
          value={values?.key}
          renderInput={(params) => (
            <TextField {...params} fullWidth label={translate("key")} />
          )}
        />
        {/* <TextField
          label={translate("key")}
          name="key"
          onChange={(e) => setFieldValue("key", e.target.value)}
          fullWidth
        /> */}

        <TextField
          label={translate("category")}
          //   value={category}
          onChange={(e) => setFieldValue("category", e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="muscle-group-label">
            {translate("muscle-group")}
          </InputLabel>
          <Select
            labelId="muscle-group-label"
            // value={muscleGroupId}
            label={translate("muscle-group")}
            onChange={(e) => setFieldValue("muscleGroupId", e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {(muscleGroupsResult?.data || []).map((mg) => (
              <MenuItem key={mg.id} value={mg.id}>
                {translate(mg.key, mg.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="equipment-label">{translate("equipment")}</InputLabel>
          <Select
            labelId="equipment-label"
            // value={equipmentId}
            label={translate("equipment")}
            onChange={(e) => setFieldValue("equipmentId", e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {(equipmentResult?.data || []).map((eq) => (
              <MenuItem key={eq.id} value={eq.id}>
                {translate(eq.key, eq.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label={translate("description")}
          //   value={description}
          onChange={(e) => setFieldValue("description", e.target.value)}
          fullWidth
          multiline
          rows={4}
        />

        <MuiDropzone
          files={values?.files}
          setFiles={(image) => setFieldValue("files", image)}
        />

        <Box sx={{ flex: 1 }} />
      </Stack>
    </Box>
  );
};

export default ExercisesForm;
