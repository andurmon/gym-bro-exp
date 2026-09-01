import { Skeleton, Typography } from "@mui/material";
import { CardStyled } from "./styles";
import { useTranslate } from "../../../../hooks/useTranslate";

const DayCard = ({ item, isToday, weekData, isWeekDataLoading = false }) => {
  const { translate } = useTranslate();
  return (
    <CardStyled key={item.key} selected={isToday} elevation={0}>
      <Typography
        variant="caption"
        sx={{
          color: isToday ? "var(--primary)" : "var(--secondary)",
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
