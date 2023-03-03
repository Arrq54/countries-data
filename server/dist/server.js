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
            code: ""
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
            allCountries = data.filter(i => { return i.code != ""; });
            res.end(JSON.stringify(data.filter(i => { return i.code != ""; })));
        });
    });
});
app.post('/getCountryInfo', (req, res) => {
    let country = allCountries.find((i) => { return i.code === req.body.code; });
    country.country_name = country.country_name.split('_').join(' ');
    res.setHeader('Content-Type', 'application/json');
    let names = [];
    allCountries.map((i) => { names.push({ name: i.country_name, code: i.code }); });
    let emissionForCountry = [];
    let counter = 0;
    let years = [];
    (0, fs_1.createReadStream)("./static/csv/Emission.csv")
        .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {
        if (counter == 0) {
            years = row.splice(1, row.length);
            counter += 1;
            return;
        }
        if (row[0] != country.country_name) {
            return;
        }
        row.map((e, i) => {
            if (i != 0) {
                if (e.includes("E")) {
                    let x = new Number(e);
                    e = x.toFixed(20);
                }
                if (years[i] > 1960)
                    emissionForCountry.push({ year: years[i], emission: parseInt(e) });
            }
        });
    })
        .on("error", function (error) {
        console.log(error.message);
    })
        .on("end", function () {
        res.end(JSON.stringify({ name: country.country_name, countries: names, emission: emissionForCountry }));
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map