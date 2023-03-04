"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express = require("express");
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const app = express();
const port = 3000;
let allCountries;
app.use(express.urlencoded());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("AAAddas");
});
app.get('/countryNamePopulation', (req, res) => {
    let data = [];
    res.setHeader('Content-Type', 'application/json');
    (0, fs_1.createReadStream)("./static/csv/population.csv")
        .pipe((0, csv_parse_1.parse)({ delimiter: ";", from_line: 2 }))
        .on("data", function (row) {
        row[2] = row[2].replace(",", "");
        data.push({
            name: row[1],
            population: row[2].replace(",", ""),
        });
    })
        .on("error", function (error) {
        console.log(error.message);
    })
        .on("end", function () {
        res.end(JSON.stringify(data));
    });
});
app.get('/getNames', (req, res) => {
    let data = [];
    res.setHeader('Content-Type', 'application/json');
    (0, fs_1.createReadStream)("./static/csv/population.csv")
        .pipe((0, csv_parse_1.parse)({ delimiter: ";", from_line: 2 }))
        .on("data", function (row) {
        data.push({
            id: row[0],
            country_name: row[1],
            current_population: row[2],
            population_2022: row[3],
            code: "",
            capital: "",
            currency: ""
        });
    })
        .on("error", function (error) {
        console.log(error.message);
    })
        .on("end", function () {
        (0, fs_1.createReadStream)("./static/csv/codes.csv")
            .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
            data.map((i, index) => { if (i.country_name === row[0].split(' ').join('_')) {
                data[index].code = row[3];
            } });
        })
            .on("error", function (error) {
            console.log(error.message);
        })
            .on("end", function () {
            (0, fs_1.createReadStream)("./static/csv/Continents.csv")
                .pipe((0, csv_parse_1.parse)({ delimiter: ";", from_line: 1 }))
                .on("data", function (row) {
                data.map((i, index) => { if (i.code === row[2]) {
                    data[index].capital = row[5];
                    data[index].currency = row[4];
                } });
            })
                .on("error", function (error) {
                console.log(error.message);
            })
                .on("end", function () {
                allCountries = data.filter(i => { return i.code != ""; });
                res.end(JSON.stringify(data.filter(i => { return i.code != ""; })));
            });
        });
    });
});
app.post('/getCountryInfo', (req, res) => {
    let country = allCountries.find((i) => { return i.code === req.body.code; });
    country.country_name = country.country_name.split('_').join(' ');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ name: country.country_name }));
});
// 
app.post('/getCountryEmissionInfo2', (req, res) => {
    let country = allCountries.find((i) => { return i.code === req.body.code; });
    country.country_name = country.country_name.split('_').join(' ');
    if (country.country_name == "United States")
        country.country_name = "USA";
    res.setHeader('Content-Type', 'application/json');
    let names = [];
    allCountries.map((i) => { names.push({ name: i.country_name, code: i.code }); });
    allCountries = allCountries.sort();
    let emissionForCountry = [];
    (0, fs_1.createReadStream)("./static/csv/other emissions/Emissions.csv")
        .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {
        if (row[0] === country.country_name && row[2] > 1960) {
            emissionForCountry.push({ year: row[2], emission: row[3] / 1000 });
        }
    })
        .on("error", function (error) {
        console.log(error.message);
    })
        .on("end", function () {
        res.end(JSON.stringify({ name: country.country_name, countries: names, emission: emissionForCountry }));
    });
});
app.post('/getCountryLifeExpectancyInfo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let country = allCountries.find((i) => { return i.code === req.body.code; });
    country.country_name = country.country_name.split('_').join(' ');
    (0, fs_1.createReadStream)("./static/csv/Life expectancy.csv")
        .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {
        console.log(row);
    })
        .on("error", function (error) {
        console.log(error.message);
    })
        .on("end", function () {
        res.end(JSON.stringify({}));
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map