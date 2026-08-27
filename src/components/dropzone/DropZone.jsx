import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MuiDropzone({ files = [], setFiles }) {
  // Esta función se ejecuta cuando el usuario suelta los archivos
  const onDrop = useCallback((acceptedFiles) => {
    // setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setFiles([...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"], // Tipos de archivo permitidos
    },
    maxSize: 5242880, // Tamaño máximo: 5MB
  });

  // Función para eliminar un archivo de la lista antes de subirlo
  const removeFile = (fileName) => {
    setFiles([]);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "20px auto" }}>
      {/* Contenedor principal de la Dropzone */}

      {/* Lista de archivos seleccionados */}
      {files?.length === 0 ? (
        <Paper
          {...getRootProps()}
          variant="outlined"
          sx={{
            padding: 4,
            textAlign: "center",
            cursor: "pointer",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: isDragActive ? "primary.main" : "text.disabled",
            backgroundColor: isDragActive ? "action.hover" : "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            sx={{
              fontSize: 48,
              color: isDragActive ? "primary.main" : "text.secondary",
              mb: 1,
            }}
          />

          {isDragActive ? (
            <Typography variant="h6" color="primary">
              ¡Suelta los archivos aquí!
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Arrastra y suelta tus imágenes aquí, o <strong>haz clic</strong>{" "}
              para seleccionar
            </Typography>
          )}
          <Typography
            variant="caption"
            color="textSecondary"
            display="block"
            sx={{ mt: 1 }}
          >
            Solo se permiten archivos JPG o PNG (Máx. 5MB)
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Archivos seleccionados:
          </Typography>
          <List dense>
            {files.map((file) => (
              <ListItem
                key={file.name}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFile(file.name)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={`${(file?.size / 1024 / 1024).toFixed(2)} MB`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
