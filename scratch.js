const fs = require("fs").promises;

const DB_PATH = "./db/db.json";

function transform(transFN) {
  fs.readFile(DB_PATH)
    .then(async (content) => {
      let db = JSON.parse(content);
      fs.writeFile(DB_PATH, JSON.stringify(transFN(db)));
    })
    .catch((e) => {
      console.error(e);
    });
}

transform((db) => {
  Object.entries(db).forEach(([k, v]) => {
    if (v.author) {
      v.authors = v.author ? v.author : "";
    }

    delete v.author;
  });

  return db;
});

// // how to download an image for sharp (do we really have to go through the FS tho?)
// const fs = require("fs").promises;

// const path =
//   "https://raw.githubusercontent.com/b2renger/Introduction_Arduino/master/assets/set_neopixels_rgb.gif";
// fetch(path)
//   .then((res) => res.blob())
//   .then((blob) => {
//     console.log(blob);
//     fs.writeFile(`./${path.split("/").pop()}`, blob.stream());
//   });
