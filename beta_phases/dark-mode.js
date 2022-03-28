// document.querySelector('.switch').addEventListener('click',()=>{
//     document.querySelector('body').classList.toggle("dark");
// });

//using jquery
$('.switch').on('click',function(){
    $('body').toggleClass("dark");
})