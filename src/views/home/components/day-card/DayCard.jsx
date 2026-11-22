import { Skeleton, Typography } from "@mui/material";
import { CardStyled } from "./styles";
import { useTranslate } from "../../../../hooks/useTranslate";
import { getCurrentDayName } from "../../utils";

const DayCard = ({
  item,
  selectedDay,
  setSelectedDay,
  weekData,
  isWeekDataLoading = false,
}) => {
  const { translate } = useTranslate();

  const currentDayName = getCurrentDayName();
  const isSelected = selectedDay === item.day;
  const isToday = item.day === currentDayName;

  return (
    <CardStyled
      key={item.key}
      selected={isSelected}
      elevation={0}
      onClick={() => setSelectedDay(item.day)}
    >
      <Typography
        variant="caption"
        sx={{
          color: isSelected ? "var(--primary)" : "var(--secondary)",
          fontWeight: 700,
        }}
      >
        {item.key}
      </Typography>
      {isWeekDataLoading ? (
        <Skeleton />
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            {translate(weekData?.[0]?.[item.day]?.category ?? "Rest Day")}
          </Typography>

          {isToday && (
            <Typography
              variant="caption"
              sx={{
                color: "var(--primary)",
              }}
            >
              Today
            </Typography>
          )}
        </>
      )}
    </CardStyled>
  );
};

export default DayCard;
