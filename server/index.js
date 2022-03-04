const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


var corOptions = {
    origin: 'http://localhost:8081'
}



//middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// routers
const router = require('./routes/productRouter')
app.use('/api/products', router)


app.get('/', (req, res) => {
    res.json({message: 'hello from myearn api'});
});

//PORT
const PORT = process.env.PORT || 3000;

//SERVER
app.listen(PORT, () => {
    console.log(`server is running on port-> ${PORT}`);
})
