console.log("JS integrated successfully!!")

//Get all the sections in the page where news will be displayed
let news_content_list = document.querySelectorAll('.news-content')

// Here,add the name of the data-file of a section, in the list in the order it is present in page
let data_list = ['country-data']

let index = 0;
//Fetch data for each section,save that data in data-file and then the data is displayed in form of news
news_content_list.forEach((news_content) => {
    fetch('../data/' + data_list[index++] + '.json')
        .then((response) => response.json())
        .then((articles) => {
            console.log(articles)
            articles.forEach(element => {
                // Sample HTML for a news-card
                // <a href="https://thehill.com/homenews/administration/555545-biden-asks-intel-community-to-redouble-efforts-probing-covid-19">
                //   <div class="covid-news-card">
                //      <div class="image-section"><img src="https://thehill.com/sites/default/files/bidenjoe_05122021getty.jpg" alt=""></div>
                //         <div class="text-section">
                //             <h3 class="news-card-subject">Biden asks intel community to 'redouble' efforts probing COVID-19 origins | TheHill - The Hill</h3>
                //             <p class='news-card-author'>Morgan Chalfant and Nathaniel Weixel</p>
                //             <p class='news-card-summary'>President BidenJoe BidenAmerican held in Russia contracts COVID-19 after denied vaccineBiden defends waiving sanctions against Nord StreamSenators struggle to save Jan .6 commissionMORE on Wednesday…</p>
                //         </div>
                //   </div>
                // </a>
                //<hr class="dropdown-divider">

                //First make an anchor tag
                let news_card = document.createElement("a")
                news_card.setAttribute("href", element['url'])

                //Append a div
                let news_card_body = document.createElement("div")
                news_card_body.classList.add("news-card")
                news_card.appendChild(news_card_body)

                //Add image section and then add image in it
                let image_section = document.createElement("div")
                image_section.classList.add("image-section")
                let image = document.createElement("img")
                image.setAttribute("src", element['urlToImage'])
                image_section.appendChild(image)
                news_card_body.appendChild(image_section)

                //Create text section,and then add elements in it
                let text_section = document.createElement("div")
                text_section.classList.add("text-section")

                let news_card_subject = document.createElement("h4")
                news_card_subject.classList.add("news-card-subject")
                news_card_subject.innerText = element['title']
                text_section.appendChild(news_card_subject)

                let news_card_author = document.createElement("p")
                news_card_author.classList.add("news-card-author")
                if (element['author'] == null) {
                    element['author'] = "Staff Reporter"
                }
                news_card_author.innerText = " By " + element['author']
                text_section.appendChild(news_card_author)

                let news_card_summary = document.createElement("p")
                news_card_summary.classList.add("news-card-summary")
                if (element['content'] != null) {
                    news_card_summary.innerText = element['content'].substring(0, element['content'].length - 20) + "..."
                } else {
                    news_card_summary.innerText = "Read more.."
                }
                text_section.appendChild(news_card_summary)

                news_card_body.appendChild(text_section)
                news_card.appendChild(news_card_body)

                //Adding each news-card to the content in covid-news-container
                news_content.appendChild(news_card)
                news_content.innerHTML += '<hr class="dropdown-divider">'
            });
        });
})