const express=require('express');
const {PORT}=require('./config');
const path=require('path');
const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public_html')));

app.get('/',(req,res)=>{
       res.render('index.ejs') ;
}); 

const server=app.listen(PORT,()=>console.log(`Server is running on ${PORT} PORT....`));


const io = require('socket.io')(server);

io.on("connection",(socket)=>{
    console.log('user connected');
    socket.username="Ganesh suthar";
    //listen on change username

    socket.on('change_username', (data) => {
        socket.username = data.username;
        //console.log(data.username);
    });

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username
        });
    });

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    });


});