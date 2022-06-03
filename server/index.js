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
const productRouter = require('./routes/productRouter')
app.use('/api/products', productRouter)

const userRouter = require('./routes/userRouter')
app.use('/api/users', userRouter)

const cartRouter = require('./routes/cartRouter')
app.use('/api/cart', cartRouter)


app.get('/', (req, res) => {
    res.json({message: 'hello from myearn api'});
});

//static Images Folder

app.use('/Images', express.static('./Images'))

//PORT
const PORT = process.env.PORT || 3000;

//SERVER
app.listen(PORT, () => {
    console.log(`server is running on port-> ${PORT}`);
})
