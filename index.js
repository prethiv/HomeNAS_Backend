const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const bodyParser = require('body-parser')
const initialize = require('./Initializer/initialize')
const mkdirnas = require('./core/mkdirNAS')
const rmdirNAS = require('./core/rmdirNAS')
const listFiles = require('./core/listFilesNAS')
const rename = require('./core/renameNAS')
const serveFile =require('./core/serveFiles')
const strs= require('./core/stream')
const fileUtil = require('./core/fileUtil')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

initialize.initNAS()

app.post('/mkdir',(req,res)=>{
    let status = mkdirnas.newDir(req)
    res.send(status)
})

app.post('/rmdir',(req,res)=>{
    let status = rmdirNAS.rmdirNAS(req)
    res.send(status)
})

app.post('/rmdirs',(req,res)=>{
  let status = rmdirNAS.rmdirsNAS(req)
  res.send(status)
})

app.post('/list',(req,res)=>{
    let filesAndFolders = listFiles.listFiles(req)
    res.send(filesAndFolders)
})

app.post('/rename',(req,res)=>{
  let status = rename.rename(req);
  res.send(status)
})

app.post('/move',(req,res)=>{
  let status = rename.moveaFile(req);
  res.send(status)
})

app.post('/movefilesAndFolders',(req,res)=>{
  let status = rename.moveMultipleFiles(req);
  res.send(status);
})

// app.post('/getFile',(req,res)=>{
//   serveFile.serveStaticFile(req,res);
// })

app.get('/view',(req,res)=>{
  serveFile.viewFile(req,res);
})

app.get('/download',(req,res)=>{
  serveFile.triggerDownload(req,res);
})

app.get("/videoplayer",(req,res)=>{
    strs.loadVideoPlayer(req,res);
});


app.get("/video", function (req, res) {
    strs.streamVideoPlayer(req,res);
});

app.get('/getfileInfo',function(req,res){
    fileUtil.getFileInfo(req,res)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})