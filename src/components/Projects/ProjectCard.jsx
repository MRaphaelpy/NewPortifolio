import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Button, CardActions, Box } from "@mui/material";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source } }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.glowOverlay}></div>
      <div className={styles.cardContent}>
        <CardMedia
          component="img"
          height="180"
          image={getImageUrl(imageSrc)}
          alt={`Project ${title}`}
          className={styles.cardMedia}
        />
        <CardContent className={styles.contentSection}>
          <Typography 
            variant="h5" 
            component="div" 
            className={styles.title}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2" className={styles.description}>
            {description}
          </Typography>
          <Box className={styles.skills}>
            {skills.map((skill, id) => (
              <Chip 
                key={id} 
                label={skill} 
                className={styles.skill} 
                size="small"
              />
            ))}
          </Box>
        </CardContent>
        <CardActions className={styles.cardActions}>
          {demo && (
            <Button 
              variant="contained" 
              href={demo} 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoButton}
              fullWidth
            >
              Live Demo
            </Button>
          )}
          {source && (
            <Button 
              variant="outlined" 
              href={source} 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceButton}
              fullWidth
            >
              Source Code
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  );
};