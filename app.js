$(function () {
  const game = $(".gameContainer");
  let started = false;
  let timeInterval = 3000;
  let score = 0;
  let gameTime = 10000;
  let clicks = 0;

  
  $("#start").click(function(e){
      started = true;
      $("#timer").html("Time: " + gameTime/1000);
      $("#showScore").html("Score: " + score);
      $(".settingsPopup").fadeOut(function(){
        createTarget();
      });
  })
  $(game).click(function(e){
    clicks += 1;
    console.log(clicks)
})
  function createTarget() {
    //crea la pelotita
    let divTarget = $("<div>").addClass("targetDiv").appendTo(game);
    //randomiza la posicion X e Y de la pelotita
    let xpos = Math.floor(Math.random() * 97);
    let ypos = Math.floor(Math.random() * 97);
    //mueve la pelotita con las posiciones X e Y randomizadas.
    divTarget.css({ top: ypos + "%", left: xpos + "%" });

    divTarget.click(function(e){
        //sumar puntaje
        //borrar el puntito cuando lo clickeamos
        score += 1;
        divTarget.remove();
        started && createTarget();
        clearTimeout(tm);
    })
    //cuenta clicks

    //borra el puntito si pasa "timeInterval" sin que lo clickeen
    let tm = setTimeout(function(){
        divTarget.remove();
        started && createTarget();
    }, timeInterval)
  }

  /* setInterval(function () {
    if (started) {
      createTarget();
    }
  }, timeInterval);
*/

  setInterval(function () {
    if (started) {
        gameTime -= 1000;
        $("#timer").html("Time: " + gameTime/1000);
        $("#showScore").html("Score: " + score); 
        $("#clicks").html("Clicks: "  + clicks); // este me queda encimado al timer, why?
        if(gameTime <= 0){
            started = false;
            $(".targetDiv").remove();
            console.log(score)
            $("#scorePop").html("Targets: " + score);
            $("#clickPop").html("Clicks: " + clicks);
            $("#accuracyPop").html("Accuracy: " + (Math.round(score * 100 / clicks)) + "%") ;
            gameTime = 60000;
            score = 0;
            clicks = 0;
            setTimeout(function(){$(".settingsPopup").fadeIn()},timeInterval);
            
        }
    }
  }, 1000);
});
