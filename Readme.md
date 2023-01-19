# Objective
To make an API to fetch latest videos sorted in reverse chronological order of their
publishing date-time from YouTube for a given tag/search query in a paginated response.


# Running the server
Frist execute fetcher.js => using  "node fetcher.js" command

then run the server.js => using "npm start"


# Testing API
After running the server, test the API in localhost on port 3000

* To get the stored video data in a paginated response sorted in
descending order of published datetime, run similar request to 'http://localhost:3000/fetch-videos?page=2&limit=10' in browser

* to search the stored videos using their title and description, run 'http://localhost:3000/search?title=something&description=something'

