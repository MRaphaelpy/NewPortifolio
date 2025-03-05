import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Button, CardActions } from "@mui/material";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source } }) => {
  return (
    <Card className={styles.card} sx={{ maxWidth: 345, margin: "auto", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
      <CardMedia
        component="img"
        height="140"
        image={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <Chip key={id} label={skill} className={styles.skill} sx={{ margin: "2px" }} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" className={styles.button} href={demo}>
          Demo
        </Button>
        <Button size="small" className={styles.button} href={source}>
          Source
        </Button>

      </CardActions>
    </Card>
  );
};