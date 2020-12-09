const xml2js = require("xml2js");

const parseFile = async (file) => {
  const infile = await file.text();
  const parser = new Parser(infile);
  return parser.activity;
};

class Parser {
  constructor(infile) {
    this.activity = new Activity();
    let root_obj = this.convertXmlToJson(infile);
    let tcdb = root_obj["TrainingCenterDatabase"];
    let activities = tcdb["Activities"];
    let activity = activities["Activity"];
    this.activity.activityId = activity["Id"];
    if (!Array.isArray(activity["Lap"])) {
      activity["Lap"] = [activity["Lap"]];
    }

    let grossHr = 0;
    const getFirstElevation = (activity) => {
      let firstLap = activity["Lap"][0];
      for (let trackpoint of firstLap["Track"]["Trackpoint"]) {
        if (trackpoint["AltitudeMeters"]) {
          return Number(trackpoint["AltitudeMeters"]);
        }
      }
    };
    let currentElevation = getFirstElevation(activity);
    let elevationGain = 0;
    let elevationChange = 0;
    for (let rawLap of activity["Lap"]) {
      this.activity.distance += Number(rawLap["DistanceMeters"]);
      this.activity.calories += Number(rawLap["Calories"]);
      this.activity.duration += Number(rawLap["TotalTimeSeconds"]);
      if (
        rawLap["AverageHeartRateBpm"]["Value"] &&
        rawLap["TotalTimeSeconds"]
      ) {
        grossHr +=
          Number(rawLap["AverageHeartRateBpm"]["Value"]) *
          Number(rawLap["TotalTimeSeconds"]);
      }
      let lap = [];
      if (!Array.isArray(rawLap["Track"]["Trackpoint"])) {
        rawLap["Track"]["Trackpoint"] = [rawLap["Track"]["Trackpoint"]];
      }
      for (let trackpoint of rawLap["Track"]["Trackpoint"]) {
        if (trackpoint["Position"]) {
          let newTrackPoint = new Trackpoint(trackpoint);
          if (trackpoint["AltitudeMeters"]) {
            elevationChange =
              Number(trackpoint["AltitudeMeters"]) - currentElevation;
            if (elevationChange > 0) {
              elevationGain += elevationChange;
              currentElevation = Number(trackpoint["AltitudeMeters"]);
            }
          }
          lap.push(newTrackPoint);
        }
      }
      this.activity.trackpoints.push(lap);
    }

    let avg_hr = parseInt(grossHr / this.activity.duration);
    this.activity.avg_hr = avg_hr;
    this.activity.elevation_gain = elevationGain;
  }

  convertXmlToJson(data) {
    let res = {};
    xml2js.parseString(data, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res = result;
      }
    });
    return res;
  }
  finish() {}
}

class Activity {
  constructor() {
    this.activityId = "";
    this.trackpoints = [];
    this.avg_hr = 0;
    this.distance = 0;
    this.calories = 0;
    this.duration = 0;
    this.elevation_gain = 0;
  }
}

class Trackpoint {
  constructor(raw_obj) {
    this.time = null;
    this.lat = null;
    this.lng = null;
    this.elevation = null;
    this.hr = null;
    this.distance = null;
    let keys = Object.keys(raw_obj);
    if (keys.includes("Time")) {
      this.time = raw_obj["Time"];
    }
    if (keys.includes("Position")) {
      try {
        let position = raw_obj["Position"];
        this.lat = Number(position["LatitudeDegrees"]);
        this.lng = Number(position["LongitudeDegrees"]);
      } catch (e) {
        console.log(e);
      }
    }
    if (keys.includes("AltitudeMeters")) {
      this.elevation = Number(raw_obj["AltitudeMeters"]);
    }
    if (keys.includes("DistanceMeters")) {
      this.distance = Number(raw_obj["DistanceMeters"]);
    }
    if (keys.includes("HeartRateBpm")) {
      try {
        let hr = raw_obj["HeartRateBpm"];
        this.hr = Number(hr["Value"]);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export default parseFile;
