const https = require("https");

const options = {
  hostname: "kodaktor.ru",
  path: "/api/chunks",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const req = https.request(options, (res) => {
  let chunkCount = 0;

  res.on("data", (chunk) => {
    chunkCount++;
    console.log(`Received chunk: ${chunk}`);
  });

  res.on("end", () => {
    console.log(`Total chunks: ${chunkCount}`);
  });
});

req.write(JSON.stringify({ login: "aeroserg" }));
req.end();
