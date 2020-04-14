const fs = require('fs');
const http = require('http');
const mysql = require('mysql');
const request = require('request');

const connection = mysql.createConnection({
    //Properties
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'machineDB'    
});

connection.connect(()=>{
    if(error){
        console.log('Error connecting database');
    }else{
        console.log('DB connected');
    }
});

//Get the data from DB and display in frontend

const selectQuery = "SELECT file_url FROM machineDB";
const file = fs.createWriteStream("File.pdf");

connection.query(selectQuery, (error, rows) => {
    if(error){
        console.log('Error in DB query');
    } else {
        request = http.get(results.file_url, (response) => {
            result = response.pipe(file);
          });          
    }
});

//Download the file to local folder


exports.getResults = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;  
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    });
  };