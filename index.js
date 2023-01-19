const express = require("express");
const app = express();
const port = 3000;

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

  } catch (error) {
    console.log(error);
  }
};

connectDb();

app.get("/", (req, res) => {
  res.send({ prop: "Hello World!" });
});


//fetch-videos?page=2&limit=10

//API which returns the stored video data in a paginated response sorted in
//descending order of published datetime.
app.get("/fetch-videos", async (req, res) => {
  const query = "SELECT * FROM videos order by datetime desc LIMIT $2 OFFSET $1";
  const { page = 1, limit = 10 } = req.query;

  setInterval(()=>{},10000)
  const response = await client.query(query ,[page, limit]);


  const rows=response.rows;
  // rows.sort((r1,r2)=>(r1[2].localeCompare(r2[2])));

  res.send({prop: rows});
});




//search API to search the stored videos using their title and description.
app.get("/search", async (req, res) => {
  const query = "SELECT * FROM videos where title=$1 and description=$2 ";
  const { title , descrip } = req.query;
  const response = await client.query(query ,[title , descrip]);

  res.send({prop: response.rows});
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

