const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"




startGame();

function startGame(){
    inicializarCards(game.createCardsFromTechs());
}  

function  inicializarCards(cards){
    let gamerbord = document.getElementById('gamerbord');
    gamerbord.innerHTML = '';
    game.cards.forEach(card=>{
        let cardElemet = document.createElement('div');
        cardElemet.id = card.id;
        cardElemet.classList.add(CARD);
        cardElemet.dataset.icon = card.icon;

        createCardContent(card, cardElemet);

        cardElemet.addEventListener('click', flipcard)
        gamerbord.appendChild(cardElemet);
    })
}

function createCardContent(card, cardElemet){

    createCardFace(FRONT, card, cardElemet);
    createCardFace(BACK, card, cardElemet);
}

function createCardFace(face, card, element){
    let cardElemetFace = document.createElement('div');
    cardElemetFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".png";
        cardElemetFace.appendChild(iconElement);
    }else{
        cardElemetFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElemetFace);
}


function flipcard(){
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGmaeOver()){
                    let gameOverLayer = document.getElementById('gameover');
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                setTimeout(() => {
                
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardview = document.getElementById(game.secondCard.id);
                    firstCardView.classList.remove('flip');
                    secondCardview.classList.remove('flip');
                    game.unfliCards();
                }, 1000);
            }
        }

    }
    
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameover');
    gameOverLayer.style.display = 'none';
}
