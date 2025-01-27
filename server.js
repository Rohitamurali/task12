//const http=require('http');

//const server=http.createServer(( req,res)=>
  //  res.end("server is running")
//);
//const port=3000;
//server.listen(port);
const express=require('express');

//creating a server
const server=express();
//assign a port numbere
const port=5004;
const items=[{
    id:1,name:'jeans'},
    {id:2,name:'shirts'},
    {id:3,name:'kurti'}];
    //middleware
server.use(express.json());
server.get('/',(req,res)=>{
   // res.end("server is running");
   res.end("server is running");
}
);
server.get('/product',(req,res)=>{
    //res.end("this is user route")
    res.json(items)
});

server.post('/product',(req,res)=>{
    newitem={id:items.length+1,name:req.body.name};
    items.push(newitem);
    res.status(201).json(newitem);
});
server.put('/product/:id',(req,res)=>
{
    const itemid=parseInt(req.params.id);
    const itemIndex=items.findIndex((item)=>item.id===itemid);
    if(itemIndex !== -1){
        items[itemIndex].name=req.body.name;
        res.json(items[itemIndex]);
    }
    else{
        res.status(404).json("item not found in data base")
    }
}

);
server.delete('/product/:id',(req,res)=>
{
    const itemid=parseInt(req.params.id);
    const itemIndex=items.findIndex((item)=>item.id===itemid);
    if(itemIndex !== -1){
        const deleteItem =items.splice(itemIndex,1);
        req.json(deleteItem);
    }
    else{
            res.status(404).send('Item not found in database');
        }
    }

);

server.listen(port,()=>
    console.log('server is running on http://localhost:$(port)')
);