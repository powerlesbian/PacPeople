//this is the position of the horizontal PacLeader
var pos = 0;
let pageWidth = window.innerWidth;
//this pacArray stores the images to allow the function to decide which image to use according to direction and focus
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];
var direction = 0;
var focus = 0;

//this is the array of onclick added Pac
const pacMen=[]; 
//this helps to randomise the direction of pac followers
function setToRandom(scale) {
  return {
    x: Math.random() * 1.2* scale,
    y: Math.random() * scale,
  };
}
// Factory to make a Pac followers
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");

  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = pacArray[direction][focus];
  newimg.width = Math.random()*200;
  newimg.style.left = (position.x + Math.random()*pageWidth*0.75)+"px";
  newimg.style.top = (position.y + Math.random()*window.innerHeight*0.5)+"px";
  game.appendChild(newimg);
  
  return {
    position,
    velocity,
    newimg,
  };
}

//loop over each Pac in array and move each one and move image in DOM
function update() {
  pacMen.forEach((addedPac) => {
    checkCollisions(addedPac);
    addedPac.position.x = addedPac.velocity.x + addedPac.position.x;
    addedPac.position.y = addedPac.velocity.y + addedPac.position.y;
//move image on page

addedPac.newimg.style.left = addedPac.position.x + "px";
addedPac.newimg.style.top = addedPac.position.y + "px";
    
  });

  setTimeout(update, 20);
}
function checkCollisions(addedPac) {
  if (
    addedPac.position.x + addedPac.velocity.x + addedPac.newimg.width > window.innerWidth ||
    addedPac.position.x + addedPac.velocity.x < 0
  )
    addedPac.velocity.x = -addedPac.velocity.x;

  if (
    addedPac.position.y + addedPac.velocity.y + addedPac.newimg.height >
      window.innerHeight ||
    addedPac.position.y + addedPac.velocity.y < 0
  )
    addedPac.velocity.y = -addedPac.velocity.y;

}

// add a new Pac onclick 
function makeOne() {
  pacMen.push(makePac()); 
}
// to stop the additional 2D moving Pacs
function stopPlease(){
    pacMen.splice(0,pacMen.length+1);
    pos = 0;
    direction = -1;
}


//This is the main marching PacLeader that just moves left to right across the screen
// This function is called as page loads. Every time it is called on 120msecs, it updates the PacMan image, position and direction on the screen.
function Run() {
  let img = document.getElementById("PacMan");
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  direction = checkPageBounds(direction, imgWidth, pos, pageWidth);
  img.src = pacArray[direction][focus];
  if (direction) {
    pos -= 20;
    img.style.left = pos + "px";
  } else {
    pos += 20;
    img.style.left = pos + "px";
  }
}
setInterval(Run, 120);
//This is the main marching PacLeader that just moves left to right across the screen
function checkPageBounds(direction, imgWidth, pos, pageWidth) {
  if (direction === 0 && (pos + imgWidth + 15) > pageWidth) direction = 1;
  if (direction === 1 && (pos-15) < 0) direction = 0;

  return direction;
}


