const express = require("express")
const fs = require('fs')
const path = require("path")
const bodyparser = require("body-parser")
const app = express()
const port = 80
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4dbc17e007ab436fb66416009dfb59a8');
// const newsapi = new NewsAPI('903567c1348c4f4ca942ee37ebc52547'); <--my key

//Setting source of static,javascripts,and data-files
app.use('/static', express.static('static'))
app.use('/scripts', express.static('scripts'))
app.use('/data', express.static('data'))
app.use(express.urlencoded())

//Setting source of html files 
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

//Reading files from directory
let home = fs.readFileSync("./views/home.html")
let trending = fs.readFileSync("./views/trending.html")
let country = fs.readFileSync("./views/country.html")
let world = fs.readFileSync("./views/world.html")
let categories = fs.readFileSync("./views/categories.html")

// //Getting data for science category page,and saving in a json file
// newsapi.v2.topHeadlines({
//     language: 'en',
//     category: 'science'
// }).then(response => {
//     // console.log((response['articles']))
//     try {
//         fs.writeFileSync('./data/category-science-data.json', JSON.stringify(response['articles']))
//     } catch (err) {
//         console.log(err)
//     }
// });

// //Getting data for technology page,and saving in a json file
// newsapi.v2.topHeadlines({
//     language: 'en',
//     category: 'technology'
// }).then(response => {
//     // console.log((response['articles']))
//     try {
//         fs.writeFileSync('./data/category-technology-data.json', JSON.stringify(response['articles']))
//     } catch (err) {
//         console.log(err)
//     }
// });

// //Getting data for business page,and saving in a json file
// newsapi.v2.topHeadlines({
//     language: 'en',
//     category: 'business'
// }).then(response => {
//     // console.log((response['articles']))
//     try {
//         fs.writeFileSync('./data/ategory-business-data.json', JSON.stringify(response['articles']))
//     } catch (err) {
//         console.log(err)
//     }
// });

// //Getting data for sports page,and saving in a json file
// newsapi.v2.topHeadlines({
//     language: 'en',
//     category: 'sports'
// }).then(response => {
//     // console.log((response['articles']))
//     try {
//         fs.writeFileSync('./data/category-sports-data.json', JSON.stringify(response['articles']))
//     } catch (err) {
//         console.log(err)
//     }
// });

// //Getting data for entertainment page,and saving in a json file
// newsapi.v2.topHeadlines({
//     language: 'en',
//     category: 'entertainment'
// }).then(response => {
//     // console.log((response['articles']))
//     try {
//         fs.writeFileSync('./data/category-entertainment-data.json', JSON.stringify(response['articles']))
//     } catch (err) {
//         console.log(err)
//     }
// });


//ROUTING FROM HERE
app.get("/", (req, res) => {
    //Getting data for covid section of homepage,and saving in a json file
    newsapi.v2.topHeadlines({
        q: 'covid',
        country: 'in',
        language: 'en',
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/covid-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });

    //Getting data for latest-news section of homepage,and saving in a json file
    newsapi.v2.topHeadlines({
        q: 'latest',
        language: 'en',
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/latest-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });
    //Now route to homepage
    res.end(home)
})

app.get("/trending", (req, res) => {
    //Getting data for trending page,and saving in a json file
    newsapi.v2.topHeadlines({
        country: 'in',
        language: 'en',
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/trending-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });
    //Route to the trending page
    res.end(trending)
})

app.get("/country", (req, res) => {
    //Getting data for country page,and saving in a json file
    newsapi.v2.everything({
        q: 'india',
        language: 'en',
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/country-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });
    //Route to India(country) page
    res.end(country)
})

app.get("/world", (req, res) => {
    //Getting top data for world page,and saving in a json file
    newsapi.v2.topHeadlines({
        language: 'en',
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/world-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });

    //Getting additional data for world page,and saving in a json file
    newsapi.v2.everything({
        language: 'en',
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/world-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });
    //Route to world page
    res.end(world)
})

app.get("/categories", (req, res) => {
    res.end(categories)
})

app.listen(port,
    console.log("Server started succesfully at " + port)
)