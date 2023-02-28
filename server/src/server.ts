// import express from 'express';
import express = require('express')
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import {parse} from "csv-parse";
import { CountryPopulationData } from './interfaces/CountryPopulationData';
import { CountryPopulationName } from './interfaces/CountryPopulationName';
import { Emissions } from './interfaces/Emissions';
const app = express();
const port = 3000;

let allCountries:CountryPopulationData[];

app.use(express.urlencoded());
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send("AAAddas")
})

app.get('/countryNamePopulation', (req: Request, res: Response) => {
  let data:Array<CountryPopulationName> = [];
  res.setHeader('Content-Type', 'application/json');
  createReadStream("./static/csv/population.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
      .on("data", function (row) {
          row[2] = row[2].replace(",","")
          data.push({
              name: row[1],
              population: row[2].replace(",",""),
          })
      })
      .on("error", function (error) {
          console.log(error.message);
      })
      .on("end", function () {
          res.end(JSON.stringify(data));
      });
});

app.get('/getNames', (req: Request, res: Response) => {
  let data:Array<CountryPopulationData> = [];
    res.setHeader('Content-Type', 'application/json');
    createReadStream("./static/csv/population.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
        .on("data", function (row) {
            data.push({
                id: row[0],
                country_name: row[1],
                current_population: row[2],
                population_2022: row[3],
                code: ""
            })
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
          createReadStream("./static/csv/codes.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    data.map((i,index)=>{if(i.country_name === row[0].split(' ').join('_')){data[index].code = row[3]}})})
                .on("error", function (error) {
                    console.log(error.message);
                })
                .on("end", function () {
                    allCountries = data.filter(i=>{return i.code!=""})
                    res.end(JSON.stringify(data.filter(i=>{return i.code!=""})));
                });
        });
});

app.post('/getCountryInfo', (req: Request, res: Response) => {
    const country:CountryPopulationData = allCountries.find((i)=>{return i.code=req.body.code})
    console.log(country);
    res.setHeader('Content-Type', 'application/json');

    let emissionForCountry: Emissions[] = [];
    let counter=0;
    let years:number[] = [];
    createReadStream("./static/csv/Emission.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {
            if(counter==0){
                years = row.splice(1,row.length);
                counter+=1;
            }
            if(row[0]!=country.country_name){return}

            row.map((e:string,i:number)=>{
                emissionForCountry.push({year: years[i], emission: parseInt(e)})
            })
            
          
            

        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            res.end(JSON.stringify(emissionForCountry));
        });
    
    // let data:Array<CountryPopulationName> = [];
    // res.setHeader('Content-Type', 'application/json');
    // createReadStream("./static/csv/population.csv")
    // .pipe(parse({ delimiter: ";", from_line: 2 }))
    //     .on("data", function (row) {
    //         row[2] = row[2].replace(",","")
    //         data.push({
    //             name: row[1],
    //             population: row[2].replace(",",""),
    //         })
    //     })
    //     .on("error", function (error) {
    //         console.log(error.message);
    //     })
    //     .on("end", function () {
    //         res.end(JSON.stringify(data));
    //     });
  });







app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});