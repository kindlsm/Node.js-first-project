const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://user1:flEjUX5H7vzkXLtJ@testcluster.ciipjl5.mongodb.net/?retryWrites=true&w=majority&appName=testcluster'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})
}).catch((err)=>{
  console.log(err)
})

app.get('/', (요청, 응답) => {
  응답.sendfile(__dirname+'/index.html')
}) 

app.get('/about', (요청, 응답) => {
    응답.sendfile(__dirname+'/about.html')
  }) 

app.get('/news', (요청, 응답) => {
  db.collection('post').insertOne({title : "어쩌구"})
  // 응답.send('오늘 비옴')
  }) 
  
  app.get('/list',async function(요청, 응답){
    let result =await db.collection('post').find().toArray()
    console.log(result[0].title)
    응답.send(result[0].title)
  })
  // async, await은 db 목록을 입출력할때 씀
