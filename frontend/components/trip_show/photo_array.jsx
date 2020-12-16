import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#fafafa",
    paddingTop: "25px",
    marginTop: "25px",
    borderTop: "1px solid rgba(31,32,65,.25)",
    width: "1200px",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    overflowX: "scroll",
    width: "1200px",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function ImageGridList({
  photoUrls,
  title,
  replaceMapWithPhoto,
}) {
  const classes = useStyles();
  let tileData = [];
  let imgObject;

  if (photoUrls) {
    let num = Math.max(5, photoUrls.length);
    for (let i = 1; i < photoUrls.length; i++) {
      imgObject = {
        img: photoUrls[i],
        title: `${title}-${i}`,
      };
      tileData.push(imgObject);
    }
  }

  const enlargePhoto = (e) => {
    replaceMapWithPhoto(e.target.src);
  };
  const removePhoto = () => {
    replaceMapWithPhoto(null);
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        {tileData.map((tile) => (
          <GridListTile
            key={tile.title}
            onMouseEnter={enlargePhoto}
            onMouseLeave={removePhoto}
          >
            <img
              src={tile.img}
              alt={tile.title}
              className={classes.image}
              key={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
