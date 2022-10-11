let game ={

    lockMode: false,
    firstCard: null,
    secondCard: null,

techs : ['choro',
    'dinheiro',
    'emoji',
    'feliz',
    'lingua-para-fora',
    'lingua',
    'oculos-escuros',
    'safado',
    'suor',
    'wow'],

    cards : null,

    setCard:function(id){
        let card = this.cards.filter(card=>card.id===id)[0];
        console.log(card);
        if(card.flipped || this.lockMode){
            return false; 
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
              
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
        
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unfliCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGmaeOver(){
       return this.cards.filter(card=>!card.flipped).length == 0;
    },


    createCardsFromTechs : function(){

        this.cards = [];
    
        this.techs.forEach((tech) => {
            this.cards.push(this.createPainFromTech(tech));
        })
    
        this.cards = this.cards.flatMap(pair=>pair);
        this.shufleCards();
        return this.cards;
    },
    
    createPainFromTech : function(tech){
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        },{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },
    
    createIdWithTech : function(tech){
        return tech + parseInt(Math.random() *1000);
    },

    shufleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex !==0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    
        }
    }
     
}