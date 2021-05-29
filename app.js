const express = require("express")
const fs = require('fs')
const path = require("path")
const bodyparser = require("body-parser")
const app = express()
const port = 80
const NewsAPI = require('newsapi');
const key_list = ['4dbc17e007ab436fb66416009dfb59a8', '903567c1348c4f4ca942ee37ebc52547']
let ind = Math.floor(Math.random() * 2)
let key = key_list[ind]
console.log(key)
const newsapi = new NewsAPI(key);

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
let category_science = fs.readFileSync("./views/categories/science.html")
let category_technology = fs.readFileSync("./views/categories/technology.html")



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
//Homepage
app.get("/", (req, res) => {
    //Getting data for covid section of homepage,and saving in a json file
    newsapi.v2.topHeadlines({
        q: 'covid',
        country: 'in',
        language: 'en',
        pageSize: 20,
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

//Trending
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

//India(country)
app.get("/country", (req, res) => {
    //Getting data for country page,and saving in a json file
    newsapi.v2.everything({
        q: 'India',
        language: 'en',
        sortBy: 'publishedAt'
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

//World
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

//Science category
app.get("/categories/science", (req, res) => {

    //Getting data for science page,and saving in a json file
    newsapi.v2.topHeadlines({
        language: 'en',
        category: 'science',
        pageSize: 25
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/category-science-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });
    res.end(category_science)
})

//Technology category
app.get("/categories/technology", (req, res) => {

    //Getting data for technology page,and saving in a json file
    newsapi.v2.topHeadlines({
        language: 'en',
        category: 'technology',
        pageSize: 25
    }).then(response => {
        // console.log((response['articles']))
        try {
            fs.writeFileSync('./data/category-technology-data.json', JSON.stringify(response['articles']))
        } catch (err) {
            console.log(err)
        }
    });
    res.end(category_technology)
})

app.get("/categories", (req, res) => {
    res.end(categories)
})

app.listen(process.env.PORT || port)