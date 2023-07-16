// here insted of alien said i  said ball
let score = 0;
const width = 25
const element = document.getElementsByClassName('box');
console.log(element);


for (let i = 0; i < width * width; i++) {
    const squre = document.createElement("div");
    element[0].appendChild(squre);
    // squre.onclick = function () {

    //     console.log(i);
    // }

}



let move = 0;
/* create  1 to 26 ball*/
const small_div = Array.from(document.querySelectorAll('.box div'));
console.log(small_div);

const alienInvaders = [0]
add = () => {
    //  random_ball_pos
    let x = parseInt(Math.random() * 25);
    alienInvaders.push(x);
}
setInterval(add, 2500); 


//create shooter
var shooter_position = 575;
small_div[shooter_position].classList.add("shooter");


//move shooter
document.onkeydown = (e) => {
    // console.log(e);
    switch (e.code) {
        case "ArrowLeft":
            small_div[shooter_position].classList.remove("shooter");
            small_div[shooter_position - 1].classList.add("shooter");

            shooter_position = shooter_position - 1;
            break;
        case "ArrowRight":
            if (shooter_position != (width * width) - 1) {
                small_div[shooter_position].classList.remove("shooter");
                small_div[shooter_position + 1].classList.add("shooter");


                shooter_position = shooter_position + 1;
            }
            break;
    }

}

//moving ball
//add ball in small_div
animate_ball = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
        small_div[alienInvaders[i]].classList.add("invetor");
    }
}
function remove() {//ball remove so that come below
    for (let i = 0; i < alienInvaders.length; i++) {
        small_div[alienInvaders[i]].classList.remove('invetor')
    }
}


let invadersId;

function change_ball_position() {
    remove();
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width;
    }
    animate_ball();
    if (small_div[shooter_position].classList.contains('invetor', 'shooter')) {
        document.getElementById('over').innerHTML = "Game over";
        console.log("Game over .")
        clearInterval(invadersId);
        remove();//all ball delete
    }
    for (let i = (width * width) - width; i < width * width; i++) {//last line ball will came than game over
        if (small_div[i].classList.contains('invetor')) {
            document.getElementById('over').innerHTML = "Game over";
            clearInterval(invadersId);
            remove();
        }
    }
}
//move ball
invadersId = setInterval(change_ball_position, 500)



/*goli*/
function goli_move(e) {
    let laser_pos = shooter_position;
    let goliI;//must write here
    function move() {


        small_div[laser_pos].classList.remove('goli');
        laser_pos -= width;
        if (small_div[laser_pos].classList.contains('invetor', 'goli')) {
            small_div[laser_pos].classList.remove('goli');
            small_div[laser_pos].classList.remove('invetor'); score++;
            document.getElementById("score").innerHTML = score;

            var index = alienInvaders.indexOf(laser_pos);
            alienInvaders.splice(index, 1);
            clearInterval(goliI);
        }
        else if (small_div[laser_pos + width].classList.contains('invetor')) {
            small_div[laser_pos].classList.remove('goli');

            small_div[laser_pos + width].classList.remove('invetor'); score++;
            document.getElementById("score").innerHTML = score;

            var index = alienInvaders.indexOf(laser_pos + width);
            alienInvaders.splice(index, 1);
            clearInterval(goliI);
        }

        else if (laser_pos >= 0 && laser_pos <= width) {
            clearInterval(goliI);
        }
        else
            small_div[laser_pos].classList.add('goli');
    }
    switch (e.key) {
        case "ArrowUp": {
            var ak47 = new Audio("ak47.wav")
            ak47.play();
            goliI = setInterval(move, 100);

        }
    }
}

document.addEventListener('keydown', goli_move);



