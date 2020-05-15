'use strict';

//Вводим переменные

let deck = ['2','2','2','2','3','3','3','3','4','4','4','4','5','5','5','5','6','6','6','6','7','7','7','7','8',
    '8','8','8','9','9','9','9','10','10','10','10','J','J','J','J','Q','Q','Q','Q','K','K','K','K','A','A','A','A'];
let cardValue = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,
    8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11];
let cardImg = ['2c','2h','2r','2s','3c','3h','3r','3s','4c','4h','4r','4s','5c','5h','5r','5s','6c','6h','6r','6s','7c',
    '7h','7r','7s','8c','8h','8r','8s','9c','9h','9r','9s','10c','10h','10r','10s','vc','vh','vr','vs','qc','qh','qr',
    'qs','kc','kh','kr','ks','ac','ah','ar','as'];
let cardsInDeck = 51;
let player = [];
let card;
let randomIndexDeck;
let playerSum = 0;
let dealerSum = 0;
let dealer = [];
let winCount = 0;
let playerCardPlace = 0;
let dealerCardPlace = 0;
const msg = document.querySelector('.msg');

//Старт игры

document.querySelector('.startBtn').addEventListener('click',startGame);

//Сброс игры

document.querySelector('.resetBtn').addEventListener('click',resetGame);

/*----------------------------------------------*/
function startGame() {
    resetTurn();
    if (player.length == 0) {
        player.push(getCard());
        sumPoints('player');
        placeCard('player');
        player.push(getCard());
        sumPoints('player');
        placeCard('player');
        dealer.push(getCard());
        sumPoints('dealer');
        placeCard('dealer');
        window.setTimeout(confirmCard, 100);
    }
}

function getCard() {
    randomIndexDeck = Math.round(Math.random()* (cardsInDeck - 0) + 0);
    card = deck[randomIndexDeck];
    deck.splice(randomIndexDeck,1);
    cardsInDeck--;
    return card;
}

function sumPoints (a) {

    //Игрок
    if (a == 'player') {

        //Если туз c перебором, то туз дает 1 очко
        if (player.includes('A') && playerSum + cardValue[randomIndexDeck] > 21) {
            console.log('сработало условие');
            function aceCase() {
                playerSum = 0;
                for (let i = 0; i < player.length; i++) {
                    switch (player[i]) {
                        case 'A':
                            playerSum += 1;
                            break;
                        case 'K':
                        case 'Q':
                        case 'J':
                        case '10':
                            playerSum += 10;
                            break;
                        default:
                            playerSum += +player[i];
                            break;
                    }
                }
                return playerSum;
            }

            playerSum = aceCase();

            //Нет туза или туз без перебора, то туз дает 11 очков
        } else {
            function sumValue() {
                playerSum = 0;
                for (let i = 0; i < player.length; i++) {
                    switch (player[i]) {
                        case 'A':
                            playerSum += 11;
                            break;
                        case 'K':
                        case 'Q':
                        case 'J':
                        case '10':
                            playerSum += 10;
                            break;
                        default:
                            playerSum += +player[i];
                            break;
                    }
                }
                return playerSum;
            }

            playerSum = sumValue();
        }
        document.querySelector('.player_points').innerHTML = playerSum;
        // Дилер
    } else {
        //Если туз c перебором, то туз дает 1 очко
        if (dealer.includes('A') && dealerSum + cardValue[randomIndexDeck] > 21) {
            function aceCase() {
                dealerSum = 0;
                for (let i = 0; i < dealer.length; i++) {
                    switch (dealer[i]) {
                        case 'A':
                            dealerSum += 1;
                            break;
                        case 'K':
                        case 'Q':
                        case 'J':
                        case '10':
                            dealerSum += 10;
                            break;
                        default:
                            dealerSum += +dealer[i];
                            break;
                    }
                }
                return dealerSum;
            }

            dealerSum = aceCase();

            //Нет туза или туз без перебора, то туз дает 11 очков
        } else {
            function sumValue() {
                dealerSum = 0;
                for (let i = 0; i < dealer.length; i++) {
                    switch (dealer[i]) {
                        case 'A':
                            dealerSum += 11;
                            break;
                        case 'K':
                        case 'Q':
                        case 'J':
                        case '10':
                            dealerSum += 10;
                            break;
                        default:
                            dealerSum += +dealer[i];
                            break;
                    }
                }
                return dealerSum;
            }

            dealerSum = sumValue();
        }
        document.querySelector('.dealer_points').innerHTML = dealerSum;
    }
}

function placeCard (g) {

    if(g == 'player') {
        let imgLink = `${cardImg[randomIndexDeck]}.png`;
        let cardplace = document.querySelectorAll('.player > .cardplace');
        cardplace[playerCardPlace].style.backgroundImage = 'url(img/' + imgLink + ')';
        playerCardPlace++;
    } else {
        let imgLink2 = `${cardImg[randomIndexDeck]}.png`;
        let cardplace = document.querySelectorAll('.dealer > .cardplace');
        cardplace[dealerCardPlace].style.backgroundImage = 'url(img/' + imgLink2 + ')';
        dealerCardPlace++;
    }
    cardImg.splice(randomIndexDeck,1);
}

function confirmCard() {
    //Вводим сообщение для игрока

    function confirmText () {
        let d = `Карты на ваших руках:`;
        let e = `Карты на руках дилера:`;
        for (let i = 0; i < player.length; i++) {
            d = d + ` ` + player[i] + ``;
        };
        for (let j = 0; j < dealer.length; j++) {
            e = e + ` ` + dealer[j] + ``;
        }
        d += `;` + `\n`;
        e += `;` + `\nБерем еще карту?`;
        let f = d + e;
        return f;
    }

    let confirmation = confirm(confirmText());
    
    if(confirmation) {

        //Добор карт игроком
        player.push(getCard());
        placeCard('player');
        sumPoints('player');

        if(playerSum <= 21) {
            window.setTimeout(confirmCard, 100);
        } else {

            msg.innerHTML = `Перебор!Вы проиграли!<br>Ваш счет - ${winCount}`;
        }
    } else {
        //Автоматический добор карт дилером
        do {
            dealer.push(getCard());
            sumPoints('dealer');
            placeCard('dealer');
            console.log(dealerSum);
        } while (dealerSum <= 17);

        //Подведение итогов

        if (playerSum > dealerSum || dealerSum > 21) {
            winCount++;
            msg.innerHTML = `Вы победили!Ваш счет - ${winCount}`;
        }
        else if (playerSum == dealerSum) {
            msg.innerHTML = `Ничья!Ваш счет - ${winCount}`;
            }
        else {
            msg.innerHTML = `Вы проиграли!Ваш счет - ${winCount}`;
        }
    }
}


function resetTurn() {
    deck = ['2','2','2','2','3','3','3','3','4','4','4','4','5','5','5','5','6','6','6','6','7','7','7','7','8',
        '8','8','8','9','9','9','9','10','10','10','10','J','J','J','J','Q','Q','Q','Q','K','K','K','K','A','A','A','A'];
    cardValue = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,
        8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11];
    cardImg = ['2c','2h','2r','2s','3c','3h','3r','3s','4c','4h','4r','4s','5c','5h','5r','5s','6c','6h','6r','6s','7c',
        '7h','7r','7s','8c','8h','8r','8s','9c','9h','9r','9s','10c','10h','10r','10s','vc','vh','vr','vs','qc','qh','qr',
        'qs','kc','kh','kr','ks','ac','ah','ar','as'];
    cardsInDeck = 51;
    player = [];
    playerSum = 0;
    dealerSum = 0;
    dealer = [];
    playerCardPlace = 0;
    dealerCardPlace = 0;
    let cardplace = document.querySelectorAll('.cardplace');
    for (let i = 0; i <= 11; i++) {
        cardplace[i].removeAttribute('style');
    };
    document.querySelector('.player_points').innerHTML = playerSum;
    document.querySelector('.dealer_points').innerHTML = dealerSum;
    msg.innerHTML = `Берем карту?`;
};

function resetGame() {
    location.reload();
}