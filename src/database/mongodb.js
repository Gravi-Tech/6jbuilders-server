const mongoose = require("mongoose");
const atlasUrl = "mongodb+srv://annamaejorge7:%40nn%40m%403j0rg3@cluster0.eww95vi.mongodb.net/";
const localUrl = "mongodb://127.0.0.1/jbuilders-db";

const useAtlas = true;
let url = useAtlas ? atlasUrl : localUrl;
module.exports = class MongoDB {
  constructor() {}
  connect() {
    mongoose.connect(url, {})
      .then(() => {
        console.log("DB Connected! " + url);
      })
      .catch((err) => {
        console.log("CONNECTION ERROR!");
        console.log(err);
      });
  }
};
