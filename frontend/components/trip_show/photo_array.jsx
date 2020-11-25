// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "no-wrap",
//     // justifyContent: "flex-end",
//     overflowX: "auto",
//     backgroundColor: "#fafafa",
//     marginTop: "100px",
//     // width: "1200px",
//   },
//   gridList: {
//     width: 1200,
//     height: 450,
//   },
// }));

// export default function ImageGridList({ photoUrls, title }) {
//   const classes = useStyles();

//   let tileData = [];
//   if (photoUrls) {
//     tileData = tileData.concat(
//       photoUrls.map((photoUrl, id) => ({
//         img: photoUrl,
//         title: `${title}-${id}`,
//       }))
//     );
//   }

//   return (
//     <div className={classes.root}>
//       <GridList cellHeight={160} className={classes.gridList} cols={}>
//         {tileData.map((tile) => (
//           <GridListTile key={tile.img} cols={tile.cols || 1}>
//             <img src={tile.img} alt={tile.title} />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#fafafa",
    marginTop: "50px",
    border: "1px solid #eee",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function ImageGridList({ photoUrls, title }) {
  const classes = useStyles();

  let tileData = [];
  if (photoUrls) {
    tileData = tileData.concat(
      photoUrls.map((photoUrl, id) => ({
        img: photoUrl,
        title: `${title}-${id}`,
      }))
    );
  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}