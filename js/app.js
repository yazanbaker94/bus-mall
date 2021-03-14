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
    this.visits = 0;
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

let listArray = [];

function render() {
    let leftIndex = randomNumber(0, randomList.length-1);
    let randomLeftImage = RandomItems.all[leftIndex];
    leftImage.src = randomLeftImage.path;
    leftImage.title = randomLeftImage.name;
    leftImage.alt = randomLeftImage.name;
    
 
      
        
 


 
    

    let middleIndex = randomNumber(0, randomList.length-1);
    let randomMiddleImage = RandomItems.all[middleIndex];
    middleImage.src = randomMiddleImage.path;
    middleImage.title = randomMiddleImage.name;
    middleImage.alt = randomMiddleImage.name;

   

    let rightIndex = randomNumber(0, randomList.length-1);
    let randomRightImage = RandomItems.all[rightIndex];
    rightImage.src = randomRightImage.path;
    rightImage.title = randomRightImage.name;
    rightImage.alt = randomRightImage.name;

    


}


imageSection.addEventListener('click', clickHandler);


function clickHandler(event) {
    if(event.target.id === 'leftImage' || event.target.id === 'rightImage' || event.target.id === 'middleImage'){
        for(let i=0; i<RandomItems.all.length; i++) {
            if(RandomItems.all[i].name === event.target.title) {
                RandomItems.all[i].visits++;
                console.log(RandomItems.all[i].name + ' ' + RandomItems.all[i].visits);
            }

        }
        render();

    }

    function stopClick(){
        if (clickHandler(event) === 25){
            clickHandler(event) === false;
        }
    }

}




 






render();
