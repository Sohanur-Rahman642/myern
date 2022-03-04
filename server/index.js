const express = require('express')
const cors = require('cors');

const app = express();


var corOptions = {
    origin: 'http://localhost:8081'
}


//middleware
app.use(cors(corOptions));

app.use(express.json())

app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.json({message: 'hello from api'});
});

//PORT
const PORT = process.env.PORT || 8080;

//SERVER
app.listen(PORT, () => {
    console.log(`server is running on port-> ${PORT}`);
})
