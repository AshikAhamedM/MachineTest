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

//Execute the api and insert data into DATABASE
const insertUrl = 'http://lms.labyrinthelab.com/api/ws_get_zipcode_details.php?zipcode=33186'
const insertQuery = "INSERT INTO machineDB(state_id, city_name, city_id, state_name, country_id, country_name, file_url ) VALUES(body.RESPONSE_DATA.state_id, body.RESPONSE_DATA.city_name, body.RESPONSE_DATA.city_id, body.RESPONSE_DATA.state_name, body.RESPONSE_DATA.country_id, body.RESPONSE_DATA.country_name, body.RESPONSE_DATA.file_url)";
request = http.get((insertUrl, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body) 
        connection.query(insertQuery, (error, rows, fields) => {
            if(error){
              console.log('Error in DB query');
            } else {
              console.log('Data inserted succesfully');
            }
        });
    }
}));


//Get the data from DB and display in frontend

const selectQuery = "SELECT state_id, city_name, city_id, state_name, country_id, country_name, file_url FROM machineDB";
connection.query(selectQuery, (error, rows) => {
    if(error){
        console.log('Error in DB query');
    } else {
        console.log('Data retrieved succesfully');
        console.log(rows);
        rows.forEach(row => {
            results = `{"state_id":${row.state_id},"city_name":${row.state_id}, "city_id":${row.city_id}, "state_name":${row.state_name}, "country_id":${row.country_id}, "country_name":${row.country_name}, "file_url":${row.file_url} }`
        });
    }
});

//Download the file to local folder
const file = fs.createWriteStream("File.pdf");
const request = http.get(results.file_url, (response) => {

  response.pipe(file);
});

exports.getResults = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;  
    res.status(200).json({
      status: 'success',
      data: {
        results
      }
    });
  };