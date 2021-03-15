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



function render() {

    let rightIndex;
    let leftIndex;
    let middleIndex;
    
    do { rightIndex = randomNumber(0, randomList.length-1);
         leftIndex = randomNumber(0, randomList.length-1);
         middleIndex = randomNumber(0, randomList.length-1 );
    }

    while(leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex);
      
   
    
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
    
    console.log(RandomItems.all[15]);
    

    } 

let buttonSection = document.getElementById('buttonSection');


imageSection.addEventListener('click', clickHandler);

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
    let resultButton = document.createElement('button');
    resultButton.textContent = 'View Results';
    buttonSection.appendChild(resultButton);

    resultButton.addEventListener('click', buttonClickHandler);

    function buttonClickHandler(event) {
        let unorderedList = document.createElement('ul');
        buttonSection.appendChild(unorderedList);
        
        

        for(let i=0; i<RandomItems.all.length; i++) {
            let listItems = document.createElement('li');
            unorderedList.appendChild(listItems);
            listItems.textContent = RandomItems.all[i].name + " had " + RandomItems.all[i].clicks + " votes and " + RandomItems.all[i].views + " views";
        }
    }


        
    }
  

}




render();
