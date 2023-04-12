const CLIENT_ID = "R4kCF8zOAkv4Q-HHbseXGZ_wWUuEfXaEarbKaWaZr7g";

const slider = document.getElementById("slider");
let state = [];
let slides;
let currentSlide;

const fetchPhotos = async ()=> {

   try{
    const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=6&query=car`;
    const response = await fetch(url);
    const data = await response.json();
    
    if(response.ok && data.length) {
        state = data;
        currentSlide = data[0].id;
        setPhotos();

    }
   } catch (err){
    console.log(err)
   }
    
};

const renderCard = ()=> {
    return state.map(({urls: {regular}, user: {name}, likes, downloads, views, id}) => {
        const isActive = currentSlide === id ? "active" : "";
        return`<div class="slide ${isActive}" data-id=${id} style="background-image:url(${regular})">
            <div class="slide-text">
            <span>Photo by </span>${name}</div>
            <div class="image-card-info">
                <p class="stats-item">${likes}
                <i class="material-icons">thumb_up</i></p>
                <p class="stats-item">${downloads}
                <i class="material-icons">cloud_download</i></p>
                <p class="stats-item">${views}
                <i class="material-icons">visibility</i></p>
            </div>
        </div> `
    })
    .join("");
}

const handleClick = ({currentTarget} )=> {
    const {id} = currentTarget.dataset;
    
    if(id === currentSlide) return;

    slides.forEach((slide)=>slide.classList.remove("active"));
    currentTarget.classList.add("active");
    currentSlide = id;
  
}

const setPhotos = () => {
    slider.innerHTML = renderCard();
    slides = document.querySelectorAll(".slide");
    slides.forEach((slide)=> {
        slide.addEventListener("click", handleClick)
    })

}

fetchPhotos();