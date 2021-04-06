'use strict'; 

import {Sound} from './misc/sound.js'
import {Ball} from './components/ball.js'; 
import {Menu} from './components/menu.js'; 
import {Paddle} from './components/paddle.js'; 


export class Game 
{

    state                       =   {
                                        'RUNNING'                   :   true, 
                                        'GAME'                      :   false, 
                                        'MENU_MAIN'                 :   true, 
                                        'MENU_PAUSE'                :   false, 
                                        'MENU_OPTIONS'              :   false, 
                                        'GAME_OVER'                 :   false,
                                        'ENABLE_CONTROL'            :   true          
                                    }

    config                      =   {
                                        'VELOCITY_BALL_MIN'         :   1,
                                        'VELOCITY_BALL_MAX'         :   500,
                                        'MAX_SCORE'                 :   1, 
                                        'DEBUG_PADDLE_COLLISION'    :   true,   
                                    }
    /**
     * @param  {HTMLCanvasElement} canvas
     */
    constructor(canvas)
    {
        //console.log('game')

        // Init Objects 
        this.canvas             =   canvas; 
        this.ball               =   new Ball(this, {x: 0, y: 0}, {width: 10, height: 10}, {dx :250, dy: 250}); 
        this.paddle_player      =   new Paddle(this, {x: 0, y: 0}, {width: 10, height: 100}, {dx :1, dy: 1}, 1); 
        this.paddle_enemy       =   new Paddle(this, {x: 0, y: 0}, {width: 10, height: 100}, {dx :250, dy: 250}, 0); 
        this.menu               =   new Menu(this); 
      
        this.sound              =   new Sound(this); 

        this.objects            =   [
                                        this.paddle_player,
                                        this.paddle_enemy, 
                                        this.ball
                                    ];

        this.set_controls(); 
    }

    draw() 
    {
        const ctx               =   this.canvas.getContext('2d'); 

        if(this.state.MENU_MAIN || this.state.MENU_OPTIONS)
        {
            this.menu.draw(ctx); 
        }
        else if(this.state.MENU_PAUSE)
        {
            ctx.fillStyle   = "#000";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.font        = `32px Arial`;
            ctx.fillStyle   = "#fff";

            ctx.fillText('GAME PAUSED', (this.canvas.width / 2) - 100, this.canvas.height / 2);
        }
        else if(this.state.GAME)
        {
            // Iterate through objects then draw 
            for(let i = 0; i < this.objects.length ; i++)
            {
                this.objects[i].draw(ctx); 
            }
        }
        else if(this.state.GAME_OVER)
        {
            ctx.fillStyle   = "#000";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.font        = `32px Arial`;
            ctx.fillStyle   = "#fff";

            ctx.fillText('GAME OVER', (this.canvas.width / 2) - 100, this.canvas.height / 2);
            ctx.fillText(
                 this.paddle_player.score > this.paddle_enemy.score ? "PLAYER 1 WINS" : 'PLAYER 2 WINS', 
                (this.canvas.width / 2) - 120, 
                (this.canvas.height / 2) + 50
            );
        }

    }
    
    /**
     * @param {float} dt - deltaTime
     */
    update(dt) 
    {
        if(this.state.MENU_MAIN || this.state.MENU_OPTIONS)
        {
            this.menu.update(dt); 
        }
        else if(this.state.MENU_PAUSE)
        {

        }
        else if(this.state.GAME)
        {
            // Iterate through objects then update
            for(let i = 0; i < this.objects.length ; i++)
            {
                this.objects[i].update(dt); 
            }

            //CHECK IF GAME IS OVER
            if(this.check_if_game_over())
            {
                this.state.GAME             =   false; 
                this.state.GAME_OVER        =   true; 
                this.sound.play('GAME_OVER'); 
            }
        }
        else if(this.state.GAME_OVER)
        {

        }
         

        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    check_if_game_over()
    {
        if(this.paddle_player.score >= this.config.MAX_SCORE || this.paddle_enemy.score >= this.config.MAX_SCORE)
        {
            return true; 
        }

        return false; 
    }

    reset()
    {
        // Iterate through objects then reset
        for(let i = 0; i < this.objects.length ; i++)
        {
            this.objects[i].reset(); 
        }

         this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    set_controls()
    {
        document.addEventListener('keydown', (e) => 
        {
            //console.log(`%cKEY: ${e.key.toLowerCase()}`, 'color:red;'); 

            if(this.state.ENABLE_CONTROL)
            {
                switch(e.key.toLowerCase())
                {
                    case 'arrowup'   :
                        if(this.state.MENU_MAIN || this.state.MENU_OPTIONS)
                        {
                            if(this.menu.cursor.index === 0)
                            {
                                this.menu.cursor.index = (this.menu.text.length - 1); 
                            }
                            else 
                            {
                                this.menu.cursor.index--; 
                            }
                        }
                        break;  
    
                    case 'arrowdown' :
                        if(this.state.MENU_MAIN || this.state.MENU_OPTIONS)
                        {
                            if(this.menu.cursor.index >= (this.menu.text.length - 1))
                            {
                                this.menu.cursor.index = 0;
                            }
                            else 
                            {
                                this.menu.cursor.index++; 
                            }
                        }
                        break;  
                        
                    case 'enter': 
                        if(this.state.MENU_MAIN)
                        {
                            switch(this.menu.cursor.index)
                            {
                                case 0: 
                                    this.state.MENU_MAIN    =       false; 
                                    this.state.GAME         =       true; 
                                    this.state.GAME_OVER    =       false; 
                                    this.reset(); 
                                    break; 

                                case 1: 
                                    this.state.MENU_MAIN    =       false; 
                                    this.state.MENU_OPTIONS =       true; 
                                    this.state.GAME_OVER    =       false; 
                                    this.menu.cursor.index  =       0;  
                                    break;
                            }
                        }
                        else if(this.state.MENU_OPTIONS)
                        {
                            switch(this.menu.cursor.index)
                            {
                                case 0: 
                                    alert('wip');
                                    break; 

                                case 1: 
                                    alert('wip');
                                    break;
                                
                                case 2: 
                                    alert('wip');
                                    break; 

                                case 3: 
                                    this.state.MENU_MAIN    =       true; 
                                    this.state.MENU_OPTIONS =       false;
                                    this.menu.cursor.index  =       0;  
                                    break; 
                            }
                        }
                        else if(this.state.MENU_PAUSE) // RESUME GAME
                        {
                            this.sound.play('PAUSE');
                            this.state.MENU_PAUSE           =       false;
                            this.state.GAME                 =       true; 
                        }
                        else if(this.state.GAME)
                        {
                            this.sound.play('PAUSE');
                            this.state.MENU_PAUSE           =       true;
                            this.state.GAME                 =       false; 
                        }
                        else if(this.state.GAME_OVER)
                        {
                            this.state.MENU_MAIN            =       true; 
                        }

                        break; 

                    case 'd': 
                        if(this.state.GAME)
                        {
                            this.check_state(); 
                        }
                        break;
            
                    case 'c': 
            
                        if(this.game.state.GAME)
                        {
                            if(this.config.DEBUG_PADDLE_COLLISION)
                            {
                                console.log('Disabling Paddle Collision'); 
                                this.config.DEBUG_PADDLE_COLLISION = false; 
                            }
                            else
                            {
                                console.log('Enabling Paddle Collision'); 
                                this.config.DEBUG_PADDLE_COLLISION = true; 
                            }
                        }
            
                        
                        break; 
                    
                    case 'r': 
                        if(this.state.GAME)
                        {
                            console.log('Reseting Game');
                            this.reset(); 
                        }
                        break;
                }
            }

        }); 
    }

    /**
     * 
     * @param {Object} component_a 
     * @param {Object} component_b 
     * 
     * Function to handle Collision
     */
    check_collision(component_a, component_b)
    {
        if(
            component_a.pos.x < (component_b.pos.x + component_b.size.width)         &&
            (component_a.pos.x + component_a.size.width) > component_b.pos.x         &&
            component_a.pos.y < (component_b.pos.y + component_b.size.height)        &&
            (component_a.pos.y + component_a.size.height) > component_b.pos.y
        )  
        {

            component_b.color = "#f33"; 
            setTimeout(() => 
            {
                component_b.color = "#000"; 
            }, 1000);
    
            return true;
        }
        return false; 
    }

    check_state()
    {
        check_state(this);
    }
}


function check_state(game)
{
    console.log(game.state);
    for(let i = 0; i < game.objects.length ; i++)
    {
        console.log(game.objects[i]);
    } 

}
