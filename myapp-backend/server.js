const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const port=5000;
app.use(cors());
app.use(bodyParser.json())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Yami',
    database:'nodereact'
});
db.connect((err)=>{
    if(err) throw err;
    console.log('connected to nodereact database...')
});
app.get('/users',(req,res)=>{
    db.query('select * from users',(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});
app.post('/users',(req,res)=>{
    const user=req.body;
    db.query('insert into users set ?',user,(err,results)=>{
        if(err) throw err;
        res.json({id:results.insetId,...user});
    });
});
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})