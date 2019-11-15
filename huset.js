window.addEventListener("DOMContentLoaded", init);

/*const searchBox = document.querySelector("#searchBox");
const allEvents = document.querySelectorAll(".events")
const searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click", test);

function test(){
    allEvents.innerHTML = "";
    const searchWord = searchBox.value;

    fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?search=" + searchWord)

        .then(res => res.json())
        .then(handleData)

}
*/

function init() {

    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    if (search) {

        getSearch();
    } else {

        getData();
    }
}


function getData() {
    console.log("main")

    /* console.log("getData") */
    fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/event?_embed&per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function getSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    /* console.log("getData") */
    console.log(search)
    fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/event?_embed&per_page=100&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    console.log(myData)
        myData.sort(compare)
    myData.forEach(showPost)

}


function compare(a, b) {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);
    return dateA - dateB
}



function showPost(post) {
    /* console.log(event.event_name)
      console.log(post.event_date)*/


    /*   const imgPath = event._embedded["wp:featuredmedia"]
       [0].media_details.sizes.thumbnail.source_url; */

    const template = document.querySelector(".eventTemplate").content;
    const postCopy = template.cloneNode(true);
  /*  post.event_date(compare)*/

    /*  const img = postCopy.querySelector("img.poster");

     img.setAttribute("src", imgPath)
     img.setAttribute("alt", "Poster of the movie " + event.event_name); */

    const poster = postCopy.querySelector(".poster");
    poster.src = post.image.guid;

    const h1 = postCopy.querySelector(".eventTitle");
    h1.textContent = post.event_name;

    const date = postCopy.querySelector(".eventDate");
    date.textContent = post.event_date;

    const time = postCopy.querySelector(".eventTime");
    time.textContent = post.event_time;

    const price = postCopy.querySelector(".eventPrice");
    price.textContent = post.price;

    const description = postCopy.querySelector(".eventDescription");
    description.innerHTML = post.content.rendered;

    const video = postCopy.querySelector(".eventTrailer");
    video.textContent = post.youtube_link;

    const excerpt = postCopy.querySelector(".eventExcerpt");
    excerpt.innerHTML = post.excerpt.rendered;

    const door = postCopy.querySelector(".eventDoor");
    door.textContent = post.door_opening_time;

    const elements = postCopy.querySelector(".eventCards");

    const heart = postCopy.querySelector(".heart");
    heart.onclick = function () {
        console.log(elements)
        change(heart)
        console.log(postCopy)
        elements.classList.toggle("likedEvent")
    }

    const hiddenContent = postCopy.querySelector(".hiddenContent");

    const readMoreButton = postCopy.querySelector(".readmoreButton");


    readMoreButton.onclick = function () {
        readMore(hiddenContent, readMoreButton)
    }

    document.querySelector(".events").appendChild(postCopy)
}



function change(save) {


    /*var save = document.querySelector('.heart');
     save.src = "img/heart2.png" */

    if (save.getAttribute("src") === "img/heart.png") {
        save.setAttribute("src", "img/heart2.png");
    } else {
        save.setAttribute("src", "img/heart.png")
    }

    if (save.getAttribute("src") === "img/heart2.png") {
        save.classList.add("liked")
    } else {
        save.classList.remove("liked")
    }

    /*this.classList.add("liked");*/
}



const liked = document.querySelector(".showLiked")
liked.addEventListener("click", showLiked);

function showLiked() {

    const allEvents = document.querySelectorAll(".eventCards")

    event.preventDefault()
    allEvents.forEach(event => {

        if (event.classList.contains("likedEvent")) {
            console.log("true");
            event.classList.add("active")
            event.classList.remove("hide")
        } else {
            event.classList.remove("active")
            event.classList.add("hide")
        }

    })
}


function readMore(contenthidden, readMoreButtonS) {
    contenthidden.classList.toggle("hide")

    if (contenthidden.classList.contains("hide")) {
        readMoreButtonS.textContent = "READ MORE"

    } else {
        readMoreButtonS.textContent = "READ LESS"
    }

}
