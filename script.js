    
//Cards
let type = ['Spade','Heart','Diamond','Club'];
let values = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jocker', 'Queen', 'King'];

function createDeck(){
  let deck=[];
  for(let i = 0; i < type.length; i++){
    for(let j = 0; j < values.length; j++){
      let card={
        Type: type[i],
        Value: values[j]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i = 0; i < deck.length; i++){
    let swap = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swap];
    deck[swap] = deck[i];
    deck[i] = tmp;
  }  
}

function getNextCard(){
  return deck.shift();  
}

function getCardString(card){
  return card.Type + " OF " + card.Value;
}

function getScore(cards){
  let score = 0; 
  for(let i = 0; i < cards.length; i++){
    switch(cards[i].Value){
      case 'One':
        score += 1;
        break;
      case 'Two':
        score += 2;
        break;  
      case 'Three':
        score += 3;
        break;
      case 'Four':
        score += 4;
        break;
      case 'Five':
        score += 5;
        break;
      case 'Six':
        score += 6;
        break;
      case 'Seven':
        score += 7;
        break;
      case 'Eight':
        score += 8;
        break;
      case 'Nine':
        score += 9;
        break;
      default:
        score += 10;
    }
  }
  return score;
}

function updateScore(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
  updateScore();
  if(gameOver){
    while((dealerScore < playerScore) && dealerScore <=21 && playerScore <= 21 ){
      dealerCards.push(getNextCard());
      updateScore();
    }
  }
  if(playerScore  > 21){
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21 ){
    playerWon = true;
    gameOver = true;
  }else if(gameOver){
    if(playerScore > dealerScore){
      playerWon = true;
    }
    else{
      playerWon = false;
    }
    newGame.style.display = "inline"; 
    hit.style.display = "none";
    stay.style.display = "none";
  }
  
}

//HTML Page

let textArea = document.getElementById('text-area');
let newGame = document.getElementById('new-game-button');
let hit = document.getElementById('hit-button');
let stay = document.getElementById('stay-button');

hit.style.display = "none";
stay.style.display = "none";




//Game Variables

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
    
//adding Event Listener 
newGame.addEventListener("click", function(){ 
  gameStarted = true,
  gameOver = false,
  playerWon = false,
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(),getNextCard()];
  playerCards = [getNextCard(),getNextCard()];
  showStatus();
  newGame.style.display = "none";
  hit.style.display = "inline";
  stay.style.display = "inline";
 
  
});    

//chance of player
hit.addEventListener("click",function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
  
});

//chance of dealer
stay.addEventListener("click",function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
  
});


//game status
function showStatus(){
  if(!gameStarted){
    textArea.innerText("Welcome To The Game..!!");
    return;
  }
  updateScore();
  let stringDealer = "Dealer Has :"+ "\n" ;
  for(let i = 0 ; i < dealerCards.length ; i++)
    stringDealer += getCardString(dealerCards[i])+"\n";
  stringDealer += " (Score: " + dealerScore + " )" ;
  
  let stringPlayer = "Player Has :"+ "\n" ;
  for(let i = 0 ; i < playerCards.length ; i++)
    stringPlayer += getCardString(playerCards[i])+"\n";
  stringPlayer += " (Score: " + playerScore + " )";
  
  textArea.innerText = stringDealer + "\n\n" + stringPlayer ;
  if(gameOver){
    if(playerWon)
      textArea.innerText += "\n\n!!.....Player Won.....!!";
    else
      textArea.innerText += "\n\n!!.....Dealer Won.....!!";
    newGame.style.display = "inline";
    hit.style.display = "none";
    stay.style.display = "none";
  }
}



