const mongoose = require("mongoose");
const atlasUrl = "atlas url here";
const localUrl = "mongodb://127.0.0.1/jbuilders-db";

const useAtlas = false;
let url = useAtlas ? atlasUrl : localUrl;
module.exports = class MongoDB {
  constructor() {}
  connect() {
    mongoose
      .connect(url, {})
      .then(() => {
        console.log("DB Connected! " + url);
      })
      .catch((err) => {
        console.log(err);
        console.log("CONNECTION ERROR!");
      });
  }
};
