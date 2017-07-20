$(document).ready(function(){

  // INTRO JOKE

    $("#greeting_hlist, #greeting_joke, #greeting_joke_answer").hide();
    $("#greeting_joke").fadeIn(2000).delay(3500).fadeOut(2000);
    $("#greeting_joke_answer").delay(8000).fadeIn(1000).delay(800).fadeOut(1000);
    $("#greeting_hlist").delay(11500).fadeIn(1000);

  // END INTRO JOKE

  // NAV SMOOTH SCROLL
  $("#nav a").click(function(e){
    e.preventDefault();

    // NAV HIGHLIGHT
    var linkList = $(".link");
    for (var i = linkList.length - 1; i >= 0; i--) {
      linkList[i].style.backgroundColor = "#000000";
    };
    this.style.backgroundColor = "#87CEEB";
    // END NAV HIGHLIGHT
    console.log(this);
    console.log(this.hash);
    $("html,body").scrollTo(this.hash,this.hash);
  });
  // END NAV SMOOTH SCROLL

  // ABOUT ME FADE TEXT/PICTURES

  $("#aboutmepictures, .aboutmeinnertext_magicbuttonback").hide();
  $(".aboutmeinnertext_magicbutton").mouseover(function(){
    $(".aboutmetext, .aboutmeinnertext_magicbutton").fadeOut(1000);
    $("#aboutmepictures, .aboutmeinnertext_magicbuttonback").delay(1000).fadeIn(1000);
  });

  $(".aboutmeinnertext_magicbuttonback").mouseover(function(){
    $("#aboutmepictures, .aboutmeinnertext_magicbuttonback").fadeOut(1000);
    $(".aboutmetext, .aboutmeinnertext_magicbutton").delay(1000).fadeIn(1000);
  });

    // $(".aboutmetext, .aboutmeinnertext_magicbutton").hide();
        

  // END ABOUT ME FADE TEXT/PICTURES






//   NAV KEY

//     $(document).scroll(function() {
//       var currentHeight = $(document).scrollTop();
//       if (currentHeight > 0 && currentHeight < 940){ 
//       } else if (currentHeight > 950 && currentHeight < 1850){
//         $(".link")[0].style.backgroundColor = "#87CEEB";
//       } else if (currentHeight > 1860 && currentHeight < 2800){
//         $(".link")[1].style.backgroundColor = "#87CEEB";
//       } else if (currentHeight > 2810 && currentHeight < 3730){
//         $(".link")[2].style.backgroundColor = "#87CEEB";
//       }
//     });

//   END NAV KEY

// KEY TO SECTION // need to use bind function to retain this value of DOM
//   document.addEventListener("keydown", scrollToNextSection, false)

//   function scrollToNextSection(event) {
//       // $('html,body').scrollTo(this.hash, this.hash);
//     if (event.keyCode === 37) {
//       console.log("left");
//     } else if (event.keyCode === 38) {
//       console.log("up");
//       console.log(this)
//     } else if (event.keyCode === 39) {
//       console.log("right");
//     } else if (event.keyCode === 40) {
//       console.log("down");
//       console.log(this)
//     } else {
//       console.log("not a directional key");
//     }
//   }

// END KEY TO SECTION



}); // END DOC