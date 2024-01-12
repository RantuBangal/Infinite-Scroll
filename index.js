let container = document.querySelector(".container");
let cardList = document.querySelector(".card-list");
let loading = document.querySelector(".loading");


fetchData(`https://jsonplaceholder.typicode.com/posts`,`?_page=1&_limit=20`);

let flag = true;
//Create single card 
function singleCard(item){
    let card = document.createElement("div");
    card.className = "card";

    let image = document.createElement("img");
    image.src = "https://www.hindustantimes.com/ht-img/img/2024/01/10/550x309/PTI01-10-2024-000077B-0_1704872552487_1704872602328.jpg";
    image.className = "card-img";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
 
    let cardTitle = document.createElement("p");
    cardTitle.className = "title";
    cardTitle.innerText = item.title;

    let cardText = document.createElement("p");
    cardText.innerText = item.body;

    cardBody.append(cardTitle,cardText);
    card.append(image,cardBody);

    return card;
}

//Append Data
function appendData(posts){
    posts.forEach((post)=>{
        let oneCard = singleCard(post);
        cardList.append(oneCard);
    })
    container.append(cardList);
    loading.style.display = 'none';
    flag = true;
}

//Fetch Data
async function fetchData(url,query=""){
    try{
        loading.style.display = 'block';
        let res = await fetch(`${url}${query}`);
        let data = await res.json();
        console.log(data);
        appendData(data);
    }
    catch(error){
        console.log(error);
    }
}


//Scroll Function
let i=2;
window.addEventListener("scroll",()=>{
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;

    if((scrollHeight-clientHeight)<=Math.ceil(scrollTop)){
        i++;
        fetchData(`https://jsonplaceholder.typicode.com/posts`,`?_page=${i}&_limit=10`);
        flag = false;
    }
})

//Condition


