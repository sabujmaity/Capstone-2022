const newsList = document.querySelector(".newslide");
let newsDisplay="";

//declaring headers required for fetching api
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Host": "covid-19-news.p.rapidapi.com",
        "X-RapidAPI-Key": "f065dae94dmsh9aa648e4262fcb5p1ca83ejsn37f3f7b18d6e",
    },
};
fetch(
    "https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&media=True",
    options
)
    .then((response) => {
        return response.json();
    })
    //concating all news headings in a single div
    .then((response) => {
        let articles = response.articles.slice(10,30);
        for(news in articles){
            console.log();
            let headings=`
                <div>${articles[news].title}</div>
            `
            newsDisplay+=headings;
        }
        newsList.innerHTML=newsDisplay;
    })

//if error happens
    .catch((err) => console.error(err));
