'use strict';

import {Game} from './pong/game.js'; 


const info_components       =       document.querySelector('.info-components');
const canvas                =       document.querySelector('#canvas'); 
const game                  =       new Game(canvas); 

let   FPS                   =       1/60; 
let   previous_time         =       0; 
let   delta_time            =       0; 

function main(current_time)
{
    if(game.state.RUNNING)
    {
        //Compute Delta Time 
        delta_time          +=      (current_time - previous_time) / 1000;
    
        previous_time       =       current_time;
/*     
        console.log(`FPS    : ${FPS}`);
        console.log(`Delta  : ${delta_time}`); */

        while(delta_time > FPS)
        {
            game.update(FPS);
            delta_time -= FPS; 
        }
        
        game.draw(); 
        get_details();
    
        window.requestAnimationFrame(main);
    }
}


function get_details()
{
    info_components.querySelector('.info-paddle-1 .info-paddle-pos-x').innerHTML    = Math.ceil(game.paddle_player.pos.x);
    info_components.querySelector('.info-paddle-1 .info-paddle-pos-y').innerHTML    = Math.ceil(game.paddle_player.pos.y);
    info_components.querySelector('.info-paddle-2 .info-paddle-pos-x').innerHTML    = Math.ceil(game.paddle_enemy.pos.x);
    info_components.querySelector('.info-paddle-2 .info-paddle-pos-y').innerHTML    = Math.ceil(game.paddle_enemy.pos.y);

    info_components.querySelector('.info-ball .info-ball-pos-x').innerHTML          = Math.ceil(game.ball.pos.x);
    info_components.querySelector('.info-ball .info-ball-pos-y').innerHTML          = Math.ceil(game.ball.pos.y);
    info_components.querySelector('.info-ball .info-ball-vel-dx').innerHTML         = Math.ceil(game.ball.velocity.dx);
    info_components.querySelector('.info-ball .info-ball-vel-dy').innerHTML         = Math.ceil(game.ball.velocity.dy);
}


window.requestAnimationFrame(main);