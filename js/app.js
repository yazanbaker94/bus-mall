'use strict';



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

let ext = [
    'jpg',
    'png',
    'gif'
];


let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let imageSection = document.getElementById('imageSection');


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



function RandomItems(name, ext){
    this.name = name;
    this.path = `./img/${name}.${ext}`;
    this.clicks = 0;
    this.views = 0;
    RandomItems.all.push(this);



}

RandomItems.all = [];


for(let i=0; i<randomList.length; i++) {
    
    if(randomList[i] === 'usb'){
    new RandomItems(randomList[i], ext[2]);
} else if(randomList[i] === 'sweep') {
    new RandomItems(randomList[i], ext[1]);
} else{
    new RandomItems(randomList[i], ext[0]);

}
}


let duplicatedArray = [];

function render() {

    let rightIndex;
    let leftIndex;
    let middleIndex;
    
    do { rightIndex = randomNumber(0, randomList.length-1);
        leftIndex = randomNumber(0, randomList.length-1);
        
        middleIndex = randomNumber(0, randomList.length-1 );
        
    }while(leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex || duplicatedArray.includes(rightIndex) || duplicatedArray.includes(leftIndex) || duplicatedArray.includes(middleIndex));
    duplicatedArray[0] = rightIndex;
    
    duplicatedArray[1] = leftIndex;
        
    
    duplicatedArray[2] = middleIndex;
   
    
    let randomLeftImage = RandomItems.all[leftIndex];
    leftImage.src = randomLeftImage.path;
    leftImage.title = randomLeftImage.name;
    leftImage.alt = randomLeftImage.name;
    RandomItems.all[leftIndex].views++;
 
    let randomMiddleImage = RandomItems.all[middleIndex];
    middleImage.src = randomMiddleImage.path;
    middleImage.title = randomMiddleImage.name;
    middleImage.alt = randomMiddleImage.name;
    RandomItems.all[middleIndex].views++;

    
    let randomRightImage = RandomItems.all[rightIndex];
    rightImage.src = randomRightImage.path;
    rightImage.title = randomRightImage.name;
    rightImage.alt = randomRightImage.name;
    RandomItems.all[rightIndex].views++;
    
    
    

    } 

    
let buttonSection = document.getElementById('buttonSection');


imageSection.addEventListener('click', clickHandler);

let maxClicks = 5;
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
  

}
let resultButton = document.createElement('button');
        resultButton.textContent = 'View Results';
        buttonSection.appendChild(resultButton);


function buttonClickHandler(event) {
    createChart();
    }

    resultButton.addEventListener('click', buttonClickHandler);


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  


  
  function createChart(){
    let context = document.getElementById('myChart').getContext('2d');
    let getRandomNames=[];
    let getRandomClicks=[];
    let getRandomViews = [];
    let randomImages=getData();
    console.log(randomImages)
  

    for(let i=0;i<RandomItems.all.length;i++){
        getRandomViews.push(randomImages[i].views);
    }
    for(let i=0;i<RandomItems.all.length;i++){
        getRandomNames.push(randomImages[i].name);
    }
    for(let i=0;i<RandomItems.all.length;i++){
        getRandomClicks.push(randomImages[i].clicks);
    }


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
    

      
    
    // render();
    let chart = new Chart(context,chartObject);
   
    
}

function getData(){
    let data=localStorage.getItem('ImagesList');
    data=JSON.parse(data);
   
    return data
  }



render();
