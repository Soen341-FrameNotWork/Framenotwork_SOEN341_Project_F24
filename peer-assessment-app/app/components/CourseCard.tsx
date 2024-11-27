import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Avatar, Divider } from "@mui/material";

interface CourseCardProp {
  onClick: (e?: any) => void;
  row: any | null;
}

export default function CourseCard({ onClick, row }: CourseCardProp) {
  return (
    <Card sx={{ minWidth: 345, minHeight: 150, bgcolor: "lightblue" }}>
      <CardActionArea
        sx={{ bgcolor: "white", minHeight: "140px" }}
        onClick={onClick}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {row.c_name}
            <Divider
              sx={{ marginBottom: "5px", border: "1px solid", width: "120px" }}
            />
          </Typography>
          <Avatar sx={{ margin: "5px", float: "right" }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
