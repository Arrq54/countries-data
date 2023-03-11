// import express from 'express';
import express = require('express')
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import {parse} from "csv-parse";
import { CountryPopulationData } from './interfaces/CountryPopulationData';
import { CountryPopulationName } from './interfaces/CountryPopulationName';
import { Emissions } from './interfaces/Emissions';
import { CountryNameCode } from './interfaces/CountryNameCode';
import { CountryNameLifeExpectancy } from './interfaces/CountryNameLifeExpectancy';
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
                code: "",
                capital: "",
                currency: ""
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
                    createReadStream("./static/csv/Continents.csv")
                    .pipe(parse({ delimiter: ";", from_line: 1 }))
                        .on("data", function (row) {
                            data.map((i,index)=>{if(i.code === row[2]){data[index].capital = row[5]; data[index].currency = row[4]}})
                        })
                        .on("error", function (error) {
                            console.log(error.message);
                        })
                        .on("end", function () {
                            allCountries = data.filter(i=>{return i.code!=""})
                            res.end(JSON.stringify(data.filter(i=>{return i.code!=""})));
                        });
                    });
                });
        });

app.post('/getCountryInfo', (req: Request, res: Response) => {
    let country:CountryPopulationData = allCountries.find((i)=>{return i.code===req.body.code})
    country.country_name = country.country_name.split('_').join(' ')
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({name: country.country_name}))
})
    
// 
  app.post('/getCountryEmissionInfo2', (req: Request, res: Response) => {
    let country:CountryPopulationData = allCountries.find((i)=>{return i.code===req.body.code})
    country.country_name = country.country_name.split('_').join(' ')
    if(country.country_name=="United States")country.country_name = "USA"
    res.setHeader('Content-Type', 'application/json');
    let names:CountryNameCode[] = [];
    allCountries.map((i:CountryPopulationData)=>{names.push({name: i.country_name,code:  i.code})})
    allCountries = allCountries.sort()
    let emissionForCountry: Emissions[] = [];
    createReadStream("./static/csv/other emissions/Emissions.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {
            if(row[0]===country.country_name && row[2]>1960){
                emissionForCountry.push({year: row[2], emission: row[3]/1000})
            }
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            res.end(JSON.stringify({name: country.country_name,countries: names,emission: emissionForCountry}));
        });
  });

app.post('/getCountryLifeExpectancyInfo', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    let country:CountryPopulationData = allCountries.find((i)=>{return i.code===req.body.code})
    country.country_name = country.country_name.split('_').join(' ')
    if(country.country_name=="United States")country.country_name = "USA"
    res.setHeader('Content-Type', 'application/json');
    let names:CountryNameCode[] = [];
    allCountries.map((i:CountryPopulationData)=>{names.push({name: i.country_name,code:  i.code})})
    allCountries = allCountries.sort()
    let lifeExpectancyForCountry: CountryNameLifeExpectancy[] = [];

    createReadStream("./static/csv/Life expectancy.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {
            if(row[0]===country.country_name){
                lifeExpectancyForCountry.push({year: row[1], value: parseFloat(row[2])})
            }
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            res.end(JSON.stringify({name: country.country_name,countries: names,life_exp: lifeExpectancyForCountry}));
    });

})


//TO DO - RANKINGS


app.post('/getRanking', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    let fileName:string, countryIndex:number, valueIndex:number, delimeter:string, fromLine:number;
    switch(req.body.ranking){
        case "Population":
            fileName = "population.csv";
            countryIndex = 1;
            delimeter = ";"
            valueIndex = 2;
            fromLine = 2; 
            break;
        case "Crime-rate":
            fileName = "Crime index 2020.csv";
            countryIndex = 0;
            delimeter = ","
            valueIndex = 1;
            fromLine = 2; 
            break;
        case "Happiness":
            fileName = "hapinness.csv";
            countryIndex = 0;
            delimeter = ","
            valueIndex = 2;
            fromLine = 2; 
            break;
        case "Alcohol-consumption":
            fileName = "alcohol_corrected.csv";
            countryIndex = 0;
            delimeter = ";"
            valueIndex = 3;
            fromLine = 2; 
            break;
        case "Health-care":
            fileName = "Quality of life 2020.csv";
            countryIndex = 0;
            delimeter = ","
            valueIndex = 4;
            fromLine = 2; 
            break;
        case "Quality-of-life":
            fileName = "Quality of life 2020.csv";
            countryIndex = 0;
            delimeter = ","
            valueIndex = 1;
            fromLine = 2; 
            break;
        case "Pollution":
            fileName = "Quality of life 2020.csv";
            countryIndex = 0;
            delimeter = ","
            valueIndex = 8;
            fromLine = 2; 
            break;
        case "Suicide-rates":
            fileName = "suicide-rates.csv";
            countryIndex = 0;
            delimeter = ";"
            valueIndex = 2;
            fromLine = 2; 
            break;
        case "HDI":
            fileName = "HDI.csv";
            countryIndex = 2;
            delimeter = ";"
            valueIndex = 32;
            fromLine = 2; 
            break;   
            
        default: break;
    }
    let data:{name:string, value:number}[] = []
    createReadStream(`./static/csv/${fileName}`)
    .pipe(parse({ delimiter: delimeter, from_line: fromLine }))
        .on("data", function (row) {
            data.push({name: row[countryIndex].replaceAll("_"," "), value: parseFloat(row[valueIndex].replaceAll(",",""))})
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            data = data.sort(function(a, b) {return b.value - a.value;})
            res.end(JSON.stringify(data));
    });
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});