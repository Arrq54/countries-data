"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express = require("express");
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const app = express();
const port = 3000;
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
        // data.map((i:CountryPopulationName)=>{i.population = i.population.replace("")})
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
            res.end(JSON.stringify(data.filter(i => { return i.code != ""; })));
        });
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map