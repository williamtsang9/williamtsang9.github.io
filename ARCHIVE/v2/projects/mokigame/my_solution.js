 // U3.W7: Design your own Code Combat Mission

// This is a solo challenge

// Your mission description:
// Overall mission: To create a speed trial game using my dog as my inspiration.
// Goals: The user will guide my dog around the rectangular park in the fastest time possible.
// Characters: Moki the PomPoo (My dog)
// Objects: moki
// Functions: Run around the perimeter of the rectangular park using keystrokes with the fastest time possible.

// Pseudocode
// Initialize moki as an object at coordinates at start point 0,0
// Create a method for start and end point for timer function
// Initialize timer function to time moki's run from startpoint and stop the timer at the stop point.
// Define a moving function that will accept keyboard keystrokes
// Report the time and show a list of best times.

// Initial Code

//      var moki = {
//           name: "Moki the PomaPoo",
//           coord_x: 0,
//           coord_y: 0
//      }

//      var startLine = {
//           startLine_coord_x: 0,
//           startLine_coord_y: 100,
//      }

//      var endLine = {
//           endLine_coord_x: -100,
//           endLine_coord_y: 0,
//      }

//      var timer = {
//           counter: 0,
//      }

// // left arrow      37
// // up arrow       38
// // right arrow    39
// // down arrow   40

//      function run(e){ 
//           if (e === "left") { //left
//                console.log("-------Moving right--------");
//                console.log("Previous location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("");
//                moki.coord_x = (moki.coord_x + 100);
//                console.log("");
//                console.log("Current location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("-----Finished moving------");
//                console.log("");               
// //up
//           } else if (e === "up"){ 
//                console.log("-------Moving up--------");
//                console.log("Previous location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("");
//                moki.coord_y = (moki.coord_y + 100);
//                console.log("");
//                console.log("Current location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("-----Finished moving------");
//                console.log("");
//  // right
//           } else if (e === "right"){
//                console.log("-------Moving left--------");
//                console.log("Previous location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("");
//                moki.coord_x = (moki.coord_x - 100);
//                console.log("");
//                console.log("Current location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("-----Finished moving------");
//                console.log("");
// //down
//           } else if (e === "down"){ 
//                console.log("-------Moving down--------");
//                console.log("Previous location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("");
//                moki.coord_y = (moki.coord_y - 100);
//                console.log("");
//                console.log("Current location:  " + moki.coord_x + " , " + moki.coord_y);
//                console.log("-----Finished moving------");
//                console.log("");               
//           }     

//      } // end function

//      // function clock(){
//      //      var breaker = true
//      //      if (moki.coord_x === 0 && moki.coord_y === 100){
//      //           while (breaker === true) {
//      //                timer.counter += 1
//      //                if (moki.coord_x === -100 && moki.coord_y === 0) {
//      //                     breaker = false;
//      //                     break;
//      //                }
//      //                else {
//      //                     breaker = true;
//      //                }
                    
//      //           }
//      //      }
//      // } // end function

// console.log(timer.counter)
// console.log(moki)
// run("up")
// run("up")
// run("right")
// run("right")
// console.log(moki)
// run("down")
// run("down")
// run("left")
// run("left")
// console.log(moki)
// // clock()
// // console.log(timer.counter)

// Refactored Code

     var moki = {
          name: "Moki the PomaPoo",
          coord_x: 0,
          coord_y: 0,
     }

     var startLine = {
          startLine_coord_x: 0,
          startLine_coord_y: 100,
     }

     var endLine = {
          endLine_coord_x: -100,
          endLine_coord_y: 0,
     }

     var timer = {
          counter: 0,
     }

var mokiIcon = document.getElementById("mokiIcon");
var startFlag = document.getElementById("startFlag");
var stopFlag = document.getElementById("stopFlag");

     function checkCoord(){
          console.log(moki.coord_x+ ", " + moki.coord_y);              
     }

     function alertWall(){
          alert("Moki ran into the fence and bounced back on the ground. :( ");          
     }

     function run(dir){ 
          if (dir.keyCode === 37) { //left
               console.log("moving left") 
                    if (moki.coord_x < -550) {
                         alertWall()
                         moki.coord_x = (moki.coord_x = -550);
                         checkCoord()
                         mokiIcon.style.left = moki.coord_x + "px";}
                    else {
                         moki.coord_x = (moki.coord_x - 50);
                         checkCoord()                     
                         mokiIcon.style.left = moki.coord_x + "px";}
          }    
          else if (dir.keyCode === 38){ //up
               console.log("moving up")
                    if (moki.coord_y < -350) {
                         alertWall()               
                         moki.coord_y = (moki.coord_y = -350);
                         checkCoord()
                         mokiIcon.style.top = moki.coord_y + "px"; } 
                    else {
                         moki.coord_y = (moki.coord_y - 50);
                         checkCoord()
                         mokiIcon.style.top = moki.coord_y + "px";}
          }

          else if (dir.keyCode === 39){ // right
               console.log("moving right")
                    if (moki.coord_x > -50){
                         alertWall()      
                         moki.coord_x = (moki.coord_x = -50);
                         checkCoord()
                         mokiIcon.style.left = moki.coord_x + "px"; }           
                    else {  
                         moki.coord_x = (moki.coord_x + 50);
                         checkCoord()
                         mokiIcon.style.left = moki.coord_x + "px"; } 
          }    

          else if (dir.keyCode === 40){ //down
               console.log("moving down")
                    if (moki.coord_y > -50) {
                         alertWall()
                         moki.coord_y = (moki.coord_y = -50);      
                         checkCoord()
                         mokiIcon.style.top = moki.coord_y + "px"; }    
                    else {
                         moki.coord_y = (moki.coord_y + 50);
                         checkCoord()
                         mokiIcon.style.top = moki.coord_y + "px"; }
                    }     

     } // end function

     // function clock(){
     //      var breaker = true
     //      if (moki.coord_x === 0 && moki.coord_y === 100){
     //           while (breaker === true) {
     //                timer.counter += 1
     //                if (moki.coord_x === -100 && moki.coord_y === 0) {
     //                     breaker = false;
     //                     break;
     //                }
     //                else {
     //                     breaker = true;
     //                }
                    
     //           }
     //      }
     // } // end function



document.onkeydown = run;



// Reflection
// I refactored what I could in the refactor section but ended up adding even more functional tools.
     // I should be able to shorten the if statements and I need to reimplement the timer in my next release. For now, you can only walk the dog around the park. I have ideas for 2-3 functions that I feel would nice to add to the somewhat complete game. As for now, the JS program simply shows a background of a dogpark with my dog's picture as the object. The timer function was written but I haven't implemented it to the game yet. I'll need to work on that in the coming days. I think I've met the requirements of challenge but I still need input those features in the next 1-2 days. One thing I noticed from this challenge is that it was difficult to find out where to start. Eventually, I used the sample student's Orpheus game as a backbone and added on entirely new features of my own creation. This challenge was tough and interesting but we probably could have used more guidance or time to build our game. That being said, I felt the level of difficulty increase from the start of the week to the end of the week. I went through many JS sites to find out exactly how to move an object interactively. I also noticed that the DOM plays a big role here so I reread articles about it. This was one heck of a challenge and I'm definitely  coming back to finish the application. Once it is complete, I will upload it to my github website for everyone to see and test.
//
//
//
//
//
//
//