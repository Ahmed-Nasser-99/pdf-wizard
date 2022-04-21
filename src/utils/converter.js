const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

module.exports = async function convert(req, file, next) {
try{    const ext = '.pdf'
    let outputPath = `${req.file.path}${ext}`;
    outputPath = path.join(__dirname, 'example.pdf')
    // Read file

    const docxBuf = await fs.readFile(req.file.path);

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
    if(pdfBuf)
      console.log('pdfBuf: ', pdfBuf)
    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf);
    req.file.path = outputPath

    next(null, true)
  }catch(err){
    next(new Error('Could not convert file'), false)
    return;
  }
}

