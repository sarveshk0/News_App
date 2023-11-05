const API_KEY="e74408993f634676bf60844c828daa67";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>
  fetchNews("India Headlines")
);


async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
     bindData(data.articles);
}


function bindData(articles){
    const cardcontainer=document.getElementById("card-container");
    const templateNewsCard=document.getElementById("template-news-container");
  
     cardcontainer.innerHTML = "";
    
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=templateNewsCard.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardcontainer.appendChild(cardclone);
    });

}

function fillDataInCard(cardclone,article){
    const newsImg=cardclone.querySelector("#news-image");
    const NewTitle=cardclone.querySelector("#Title");
    const NewsSource=cardclone.querySelector("#news-source");
    const NewsDesc=cardclone.querySelector("#news-desc");
    
 newsImg.src=article.urlToImage;
 NewTitle.innerHTML=article.title;
 NewsDesc.innerHTML=article.description;

 const date=new Date(article.publishedAt).toLocaleString("en-Us",{
    timeZone:"Asia/Jakarta",
 })

 NewsSource.innerHTML=`${article.source.name}${date}`;

 cardclone.firstElementChild.addEventListener("click",()=>{
  window.open(article.url,"_blank");
 });

}
  let curSelectnav=null;
  function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectnav?.classlist.remove("active");
    curSelectnav=navItem;
    curSelectnav.classList.add("active")
  }

  const searchbutton=document.getElementById("search-button");
  const searchtext=document.getElementById("search-text");
  
  searchbutton.addEventListener("click",()=>{
    const query=searchtext.value;
    if(!query) return;
    fetchNews(query);

  })
