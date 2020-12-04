const formidable = require('formidable');
var mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

exports.postUploadGame = (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', (name, file) => {

        let fileName = file.name;
        file.path = './public/subgames/' + name.toLowerCase() + '/' + fileName.toLowerCase();
    });

    form.on('file', function (name, file) {

        
        fs.createReadStream(file.path)
            .pipe(unzipper.Extract({ path: './public/SubGames/' + name + '/' }));
    
      // console.log('Uploaded ' + file.name);

        
    });

    res.redirect('/');
}


exports.postUploadGameIcon = (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', (name, file) => {
        file.path = './public/img/UlkaGameIcons/' + name.toLowerCase() + '.png';
    });

    form.on('file', function (name, file) {
        res.render('game/gameUpload', { gameName: name.toLowerCase() });
        // console.log('Uploaded ' + file.name);
    });

}


exports.postNewGame = (req, res) => {

    // console.log(req.body);
    const gamesPath = path.join(path.dirname(process.mainModule.filename), 'data', 'gameData.json');
    mkdirp('./public/subgames/' + req.body.name.toLowerCase(), (err) => {
        if (err) console.error(err)
        else {

            let data = req.body;
            res.render('game/gameUploadIcon', { gameName: data.name.toLowerCase() });

            fs.readFile(gamesPath, (err, fileContent) => {
                let htmlgames = []
                if (!err) {
                    htmlgames = JSON.parse(fileContent);
                }
                htmlgames.push(data.name.toLowerCase());

                fs.writeFile(gamesPath, JSON.stringify(htmlgames), (err) => {
                    if (err)
                        console.log(err);
                })
            })
        }
    });

}



exports.postLudoClubHost = (req, res) => {

    // console.log(req.body);
    const gamesPath = path.join(path.dirname(process.mainModule.filename), 'data', 'gameData.json');
  
    let data = req.body;

    console.log(data.name);
    
    res.render('game/ludoclubhost');
    fs.readFile(gamesPath, (err, fileContent) => {
        let ludoclubhost = "";
        if (!err) {
            ludoclubhost = JSON.parse(fileContent);
        }
        ludoclubhost = data.name.toLowerCase();

        fs.writeFile(gamesPath, JSON.stringify(ludoclubhost), (err) => {
            if (err)
                console.log(err);
            else
            console.log("writeFileDone");
        })
    })
}
