# bus-mall Project

### Author: Yazan Baker
### Date: 18 March 2021
### Project Name: Bus-Mall
### Desc: 

This project basically shows the user 3 random images that are generated at random using Javascript functions and Math.Random functions. These images are not duplicated, so each image gets an equal random probability to show up, then the second round, the same images are disqualifed from the round and only new images show up to increase the fairness of the votes.

The user is then asked to vote 25 times. After each 'click'/vote, the images are re-generated at random again and he is required to vote and do the same thing 25 times. 

All this time, the information/data collected from the clicks choices and the amount of times the image is shown is saved to localStorage in the browser. When this is over, the user is requested to click the view results button, where there is a graph/js chart that is generated using the data from the localstorage. The clicks and views are generated in a bar chart where the user can see the results in two bar lines next to each other. Now, even if the user refreshes the page, the result will still be saved in the local storage, and therefore if the user clicks the view results button without going through the random images again, even though he refreshed the page, the data will still be available and yet not overwritten.

#### The End.
