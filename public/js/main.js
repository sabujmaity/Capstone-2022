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


//adding dark mode using jquery
$('.switch').on('click',function(){
    $('body').toggleClass("dark");
})

//adding features sliding function
var slider=document.querySelector('.symtoms-slider');
var active=document.querySelector('#active');
var line1=document.querySelector('#line1');
var line2=document.querySelector('#line2');
var line3=document.querySelector('#line3');
var line4=document.querySelector('#line4');
line1.addEventListener('click',function(){
    slider.style.transform='translateX(0)';
    active.style.top='0px';
})
line2.addEventListener('click',function(){
    slider.style.transform='translateX(-25%)';
    active.style.top='80px';
})
line3.addEventListener('click',function(){
    slider.style.transform='translateX(-50%)';
    active.style.top='160px';
})
line4.addEventListener('click',function(){
    slider.style.transform='translateX(-75%)';
    active.style.top='240px';
})

//adding alert animation functionality
const button = document.querySelector('.submit-btn');
const alert = document.querySelector('.alert');
const close = document.querySelector('.close');
const progress = document.querySelector('.progress');

button.addEventListener('click', ()=>{
    alert.classList.add('active');
    progress.classList.add('active');
    setTimeout(()=>{
        alert.classList.remove('active');
    }, 5000);
    setTimeout(()=>{
        progress.classList.remove('active');
    }, 5300);
});
close.addEventListener('click', ()=>{
    alert.classList.remove('active');
    setTimeout(()=>{
        progress.classList.remove('active');
    }, 300);
});