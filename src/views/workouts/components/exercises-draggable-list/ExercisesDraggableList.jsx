import React from "react";

import {
  Draggable,
  DragDropContext,
  Droppable,
} from "@adaptabletools/react-beautiful-dnd";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";

import { DragIndicator } from "@mui/icons-material";

const DraggableListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <ListItem ref={provided.innerRef} {...provided.draggableProps}>
          <ListItemAvatar>
            <IconButton
              {...provided.dragHandleProps}
              aria-label="Drag exercise"
            >
              <Avatar>
                <DragIndicator />
              </Avatar>
            </IconButton>
          </ListItemAvatar>
          <ListItemText primary={item.primary} secondary={item.secondary} />
        </ListItem>
      )}
    </Draggable>
  );
};

const ExercisesDraggableList = React.memo(
  ({ items = [], onDragEnd = () => {} }) => {
    const handleDragEnd = (result) => {
      if (
        !result.destination ||
        result.destination.index === result.source.index
      ) {
        return;
      }

      onDragEnd(result);
    };

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DraggableListItem
                  item={item}
                  index={index}
                  key={String(item.id)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  },
);

export default ExercisesDraggableList;
