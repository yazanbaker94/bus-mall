'use strict';


// randomList array
let randomList = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
];
// make extensions for the checker
let ext = [
    'jpg',
    'png',
    'gif'
];

// got the ID's of the images and section
let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let imageSection = document.getElementById('imageSection');

// create a random function to be used later on to generate the Items.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


// function to define the name, path, clicks, views, and then push it to the array
function RandomItems(name, ext){
    this.name = name;
    this.path = `./img/${name}.${ext}`;
    this.clicks = 0;
    this.views = 0;
    RandomItems.all.push(this);



}
// make randomItems array
RandomItems.all = [];

// create an exception for usb and sweep, else it continues normally for the extensions
for(let i=0; i<randomList.length; i++) {
    
    if(randomList[i] === 'usb'){
    new RandomItems(randomList[i], ext[2]);
} else if(randomList[i] === 'sweep') {
    new RandomItems(randomList[i], ext[1]);
} else{
    new RandomItems(randomList[i], ext[0]);

}
}

// create a duplicate array to make sure the items in the array to not duplicate
let duplicatedArray = [];
// render function to eventually show the images on the website and make sure they are not duplicated on the first round or there aren't any similiraties with the second round
function render() {

    let rightIndex;
    let leftIndex;
    let middleIndex;
    
    do { rightIndex = randomNumber(0, randomList.length-1);
        leftIndex = randomNumber(0, randomList.length-1);
        
        middleIndex = randomNumber(0, randomList.length-1 );
     // resolving duplication statement inside a while loop   
    }while(leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex || duplicatedArray.includes(rightIndex) || duplicatedArray.includes(leftIndex) || duplicatedArray.includes(middleIndex));
    duplicatedArray[0] = rightIndex;
    
    duplicatedArray[1] = leftIndex;
        
    
    duplicatedArray[2] = middleIndex;
   
    // generate random left IMage
    let randomLeftImage = RandomItems.all[leftIndex];
    leftImage.src = randomLeftImage.path;
    leftImage.title = randomLeftImage.name;
    leftImage.alt = randomLeftImage.name;
    RandomItems.all[leftIndex].views++;
     // generate random middle IMage

    let randomMiddleImage = RandomItems.all[middleIndex];
    middleImage.src = randomMiddleImage.path;
    middleImage.title = randomMiddleImage.name;
    middleImage.alt = randomMiddleImage.name;
    RandomItems.all[middleIndex].views++;

        // generate random right IMage

    let randomRightImage = RandomItems.all[rightIndex];
    rightImage.src = randomRightImage.path;
    rightImage.title = randomRightImage.name;
    rightImage.alt = randomRightImage.name;
    RandomItems.all[rightIndex].views++;
    
    
    

    } 

    // get button ID
let buttonSection = document.getElementById('buttonSection');

// button click event listener
imageSection.addEventListener('click', clickHandler);

// after 25 clicks, the click button is disabled.
let maxClicks = 25;
function clickHandler(event) {
    maxClicks-=1;
    if(event.target.id === 'leftImage' || event.target.id === 'rightImage' || event.target.id === 'middleImage'){
        for(let i=0; i<RandomItems.all.length; i++) {
            if(RandomItems.all[i].name === event.target.title) {
                RandomItems.all[i].clicks++;
               
            }

        }
        render();
       
    }
    if(maxClicks === 0){
    imageSection.removeEventListener('click', clickHandler);
    if(maxClicks === 0){
        imageSection.removeEventListener('click', clickHandler);
        
    
        localStorage.setItem('ImagesList',JSON.stringify(RandomItems.all));

    

    }
    }
  

}//view results button to be defined
let resultButton = document.createElement('button');
        resultButton.textContent = 'View Results';
        buttonSection.appendChild(resultButton);

// if view results button is clicked, graph is drawn
function buttonClickHandler(event) {
    createChart();
    }

    resultButton.addEventListener('click', buttonClickHandler);


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  


  //chart creation
  function createChart(){
    let context = document.getElementById('myChart').getContext('2d');
    let getRandomNames=[];
    let getRandomClicks=[];
    let getRandomViews = [];
    let randomImages=getData();
    console.log(randomImages)
  
//randomImages gets the data from the getData function, which is stored on the local storage
    for(let i=0;i<RandomItems.all.length;i++){
        getRandomViews.push(randomImages[i].views);
    }
    for(let i=0;i<RandomItems.all.length;i++){
        getRandomNames.push(randomImages[i].name);
    }
    for(let i=0;i<RandomItems.all.length;i++){
        getRandomClicks.push(randomImages[i].clicks);
    }

// chartOBJECT includes Random image names and the random image clicks and random image views, from the local storage
    let chartObject={
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels:getRandomNames,
            datasets: [{
                label: 'Random images voting results',
                backgroundColor: 'rgb(253, 255, 204 )',
                borderColor: 'rgb(88, 24, 69)',
                data: getRandomClicks
            },
            {
              label: 'Random images views results',
              backgroundColor: 'rgb(255, 208, 204 )',
              borderColor: 'rgb(88, 24, 69',
              data: getRandomViews
          }],
        }, 
      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
            barPercentage: 1
          }]
        }
      }
    };
    

      
    // render after view results is clicked
    // render();
    let chart = new Chart(context,chartObject);
   
    
}
// gets the data from the imagesList saved on the local storage
function getData(){
    let data=localStorage.getItem('ImagesList');
    data=JSON.parse(data);
   
    return data
  }



render();
