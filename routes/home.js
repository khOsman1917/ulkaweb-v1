
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();


const gamesPath = path.join(path.dirname(process.mainModule.filename), 'data', 'gameData.json');
const employeesPath = path.join(path.dirname(process.mainModule.filename), 'data', 'employees.json');


// router.get('/', (req, res, next) => {
//   // res.render('index');

//   fs.readFile(gamesPath, (err, fileContent) => {

//     let data = JSON.parse(fileContent);

//     //  console.log(data.htmlgames);
//     res.render('home', {
//       htmlgames: data.htmlgames,
//       androidgames: data.androidgames,
//       moonfroggames: data.moonfroggames
//     });


//   })

// });




router.get('/about', (req, res, next) => {

  // fs.readFile(employeesPath, (err, fileContent) => {

  //   let employees = JSON.parse(fileContent);
  // //  console.log(employees);
  //   res.render('about', { employees: employees });
  // })

  res.redirect("https://ulka.games/#about");

});



router.get('/webgame', (req, res, next) => {
  // res.render('index');

  fs.readFile(gamesPath, (err, fileContent) => {

    let data = JSON.parse(fileContent);

    //  console.log(data.htmlgames);
    res.render('webgame', {
      htmlgames: data.htmlgames,
      androidgames: data.androidgames,
      moonfroggames: data.moonfroggames
    });


  })

});


router.get('/teenpattigold', (req, res, next) => {
  // res.render('index');

  fs.readFile(gamesPath, (err, fileContent) => {

    let data = JSON.parse(fileContent);

    //  console.log(data.htmlgames);
    res.render('teenpattigold', {
      htmlgames: data.htmlgames,
      androidgames: data.androidgames,
      moonfroggames: data.moonfroggames
    });


  })

});


router.get('/ludoclub', (req, res, next) => {
  // res.render('index');

  fs.readFile(gamesPath, (err, fileContent) => {

    let data = JSON.parse(fileContent);

    //  console.log(data.htmlgames);
    res.render('ludoclub', {
      htmlgames: data.htmlgames,
      androidgames: data.androidgames,
      moonfroggames: data.moonfroggames,
      ludoclubhost: data.ludoclubhost
    });


  })

});


router.get('/privacy-policy', (req, res, next) => {

  res.render('privacy-policy');

});

router.get('/policy', (req, res, next) => {

  res.render('policy');

});


router.get('/bKash', (req, res, next) => {

  res.render('bKash');

});


router.get('/bkash-privacy-policy', (req, res, next) => {

  res.render('bkash-privacy-policy');

});


router.get('/apay', (req, res, next) => {

  res.render('apay');

});


router.get('/apay-privacy-policy', (req, res, next) => {

  res.render('apay-privacy-policy');

});

router.get('/', (req, res, next) => {

 // res.render('newhome');

  
  fs.readFile(employeesPath, (err, fileContent) => {

    let employees = JSON.parse(fileContent);
  // //  console.log(employees);
  //   res.render('newhome', {
  //      employees: employees,
  //      htmlgames: data.htmlgames,
  //      androidgames: data.androidgames,
  //      moonfroggames: data.moonfroggames
  //     });
  // })


  fs.readFile(gamesPath, (err, fileContent) => {

    let data = JSON.parse(fileContent);

    //  console.log(data.htmlgames);
    res.render('newhome', {
      employees: employees,
      htmlgames: data.htmlgames,
      androidgames: data.androidgames,
      moonfroggames: data.moonfroggames
    });

  });

  });

});


module.exports = router;
