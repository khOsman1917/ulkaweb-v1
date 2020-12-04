
exports.getLogin = (req, res, next) => {
    res.render('access/login',  {
        text1: "Enter Your User Name",
        text2: "Enter Your Password"
    });
}


exports.postLogin = (req, res) => {

    let data = req.body;
    console.log(req.body);

    if (data.userName === 'ulka' && data.userPassword === 'games') {
      //  res.render('game/newGame', { gameName: 'newGame' });
       res.render('game/luduclubuhost', { oldHost: '' });
    }
    else {
        res.render('access/login', {
            text1: "User Name Wrong",
            text2: "Password Wrong"
        });
    }
}
