app.post('/upload', upload,async (req, res) => {
  // if (req.body) {
  //   const pdf = req.body.pdf;

  //   // Get the name file from the request body.
  //   const name = req.body.name;
  //   console.log(name)
  //   // idFile =await drive.drive.upFile(pdf,req.headers.token,name)
    
  // }

  res.send("idFile");

});
async function up(req) {
  console.log(req.headers.token)
  let newReq;
  // if(req.files){
  //   if (req.files.pdf){
  //      fileContent =await fs.createReadStream(req.files.pdf.tempFilePath);
  //      nameCo =await fs.createReadStream(req.files.name.tempFilePath);
  //   }
  //   // console.log("file")
  if (req.body) {
    if (req.body.pdf){
      
       fileContent = await fs.createReadStream(req.body.pdf);
       nameCo = await fs.createReadStream(req.body.name);
    }
    idFile =await drive.drive.upFile(fileContent,req.headers.token,nameCo)
    idFile = await JSON.parse(idFile)
    // await console.log("sadas" +idFile)
    // fileLink = await drive.drive.getlinkFile(idFile)
  
    if (idFile !==400)  {
      newReq = {
        attachments:[ {
          fileUrl: idFile.webViewLink, // הקישור לצפייה בקובץ בדרייב
          mimeType: idFile.mimeType,
          title: idFile.name,
        }]
       ,
       ...req.headers
     }
   }
   }
console.log(JSON.stringify(newReq))
return newReq
  //  res.send(newReq)
// });
  }