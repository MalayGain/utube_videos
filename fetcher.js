const axios = require("axios");

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// let coloumns=[title, descrip,datetime,url]
const connectDb = async () => {
    try {
      await client.connect();
  
      //         const res = await client.query('SELECT * FROM videos')
      //         console.log(res) //await client.end()
    } catch (error) {
      console.log(error);
    }
  };
connectDb();
const insertVideo = async (columns) => {
  try {
    const insertQuery = "INSERT INTO videos VALUES ($1, $2, $3, $4)";
    await client.query(insertQuery, columns);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

async function getVideos() {
  const url =
    "https://youtube.googleapis.com/youtube/v3/search?maxResults=20&key=AIzaSyBjvBxJ9b8jMVXHngsmQ2INhnTd1nEW63k&part=snippet";
  await axios
    .get(url)
    .then((response) => {
      response.data.items.forEach(function (item) {
        console.log(item.snippet.title);
        let snippet = item.snippet;
        let row = [
          snippet.title,
          snippet.description,
          snippet.publishedAt,
          snippet.thumbnails.default.url,
        ];

        insertVideo(row).then((result) => {
          if (result) {
            console.log("video inserted");
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}


async function clearTable() {
    try {
        const deleteQuery = "DELETE FROM videos";
        await client.query(deleteQuery);
        return true;
      } catch (error) {
        console.error(error.stack);
        return false;
      }
} 


console.log("Fetcher is running at an interval of 10 seconds...");

setInterval(()=>{
    clearTable();
    getVideos();
}, 10000)

//getVideos();

