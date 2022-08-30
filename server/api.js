const client = require('./connection.js')
const Stack = require('./stack.js');
const express = require('express');
const app = express();
const Queue = require('./queue.js');
var cors = require('cors');
app.use(cors());

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/vendors', (req, res)=>{
    client.query(`Select * from vendor`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/vendors/:id', (req, res)=>{
    client.query(`Select * from vendor where user_id=${req.params.id}`, (err, result)=>{
        if(!err){
            console.log("Server got hit")
            res.send(result.rows);
        }
        else
        {
            console.log('No data found')
        }
    });
    client.end;
})


app.post('/vendor', (req, res)=> {
    const user = req.body;
    console.log(user.email)
    client.query(`select * from vendor_details  where email='${user.email}'`,(err,result)=>{
        
        if(result.rows.length>=1)
        {
            console.log("Email already exist")
            res.status(201);
            res.send("Email already exist")
        }
        else{
            let insertQuery = `insert into vendor_details(email, password) 
            values('${user.email}', '${user.password}')`

            client.query(insertQuery, (err, result)=>{
            if(!err){
            res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
            })
        }
    });

    client.end;
})


var stack = new Stack();
var queue = new Queue();
var dict = {};



  app.put('/login',(req,res)=>{
    const user=req.body
    client.query(`select * from vendor_details where email='${user.email}'`,(err,result)=>{
        if(result.rows.length>=1)
        {
          //  const result1 = JSON.parse(JSON.stringify(result));
          if(user.password === result.rows[0].password)
          {
            client.query(`UPDATE vendor_details  SET online_status='${true}'  where email='${user.email}'`,(err,result)=>{
                stack.push(user.email)
                dict[user.email]=0
                console.log(stack.printStack());
                res.send(user.email)
            });


          }
          else{
            res.status(202)
            res.send("Email or Password is incorrect")
          }

        }
        else
        {
            res.status(202);
            res.send("Email or Password is incorrect")
        }
    });
    client.end;
})

app.post('/create_session',(req,res)=>{
    const user=req.body;
    console.log(user)
    client.query(`select * from session where sname='${user.sname}'`,(err,result)=>{
  
    if(result.rows.length>=1)
    {
        res.status(201)
        res.send('Session with this name Exist')  
    }
else
{
  
    client.query(`select * from client where email='${user.email}'`,(err,result)=>{
        
        if(result.rows.length>=1)
        {
            console.log("Email already exist")
        }
        else
        {
            client.query(`insert into client(email) values('${user.email}')`,(err,result)=>{
                console.log('Client Email inserted in database')
            })
        }

    client.query(`insert into session(sname,client_email) values('${user.sname}','${user.email}')`,(err,result)=>{
        if(!err)
        {
            queue.enqueue(user.sname);
            res.send('Session Created')

        }
        else{
            console.log(err.message)
        }
    })
    })
}
})
    client.end;
})

 app.put('/assign_vendor',(req,res)=>{
    const user=req.body;
    flag=false;
    if(!stack.isEmpty())
    {
        let x=stack.length();
        for (let i = 0; i < x; i++) {
            var vendor_email=stack.pop()
            if(dict[vendor_email]<2){
                dict[vendor_email]+=1;
                stack.push(vendor_email);
                sname=queue.dequeue()
                client.query(`Update session set vendor_email='${vendor_email}' where sname='${user.sname}'`,(err,result)=>{
                    res.send(vendor_email);
                })                
                flag=true;
                break;
            }
            else
            {
                stack.push(vendor_email)
            }
          } 
          if(flag===false)
          {
          res.status(201)
          res.send(false)
          }

    }
    else
    {
        res.status(201)
        res.send(false)
    }
    client.end;
  

 })


 app.put('/get_client',(req,res)=>{
    const user=req.body;
    client.query(`select * from session where vendor_email='${user.email}' AND waiting='${true}'`,(err,result)=>{

        if(result.rows.length>=1)
        {
            // console.log(result.rows[0]['sname'])
            client.query(`Update session set waiting='${false}' where sname='${result.rows[0]['sname']}'`,(err,result)=>{
            })                
            res.send(result.rows[0])

        }
        else
        {
            res.status(201)
            res.send('No clients found')
        }

    })
    client.end;
 })

 app.put('/exit_chat',(req,res)=>{
    const email=req.body.email
    console.log(req.body)
    console.log(email)
    if(dict[email]>=1)
    {
    dict[email]-=1;
    console.log(dict)
    }
    res.send("Successfully Changed")
    client.end;
 })


 app.post('/rate_session',(req,res)=>{
    const user=req.body;
    client.query(`insert into rating (sname,vendor_email,client_email,score) VALUES('${user.sname}','${user.vendor_email}','${user.client_email}',${user.score})`,(err,result)=>{
        if(!err){
            res.send('Insertion was successful')
            }
            else{ 
                console.log(err.message)
             }

    })
 })