const app = require("..");
const { connectDb } = require("./config/db");
const PORT = 8000;

app.listen(PORT, async () => {
    console.log('E-Commerce api listening on Port : ', PORT);
    await connectDb().then(() => console.log('Connected to DB'))
})