'use strict'; 


export class Paddle
{
    /**
     * @param  {object} game
     * @param  {object} pos
     * @param  {object} size
     * @param  {object} velocity
     */
    constructor(game, pos, size, velocity, player = 0)
    {
        this.game       =   game; 
        this.pos        =   pos; 
        this.size       =   size; 
        this.velocity   =   velocity;
        this.player     =   player; 
        this.color      =   "#000"; 

        this.pos.x      =   this.player == 1 ? 25 : (this.game.canvas.width - this.size.width) - 25;  
        this.pos.y      =   Math.round((this.game.canvas.height - this.size.height) / 2);  
        this.score      =   0; 

        if(this.player === 1)
        {
            this.add_controls(); 
        }
    }

    
    /**
     * @param  {Canvas2dContext} ctx
     */
    draw(ctx) 
    {
        ctx.fillStyle = this.color;
        
        ctx.fillRect(
            this.pos.x, 
            this.pos.y, 
            this.size.width, 
            this.size.height
        );

        ctx.font        = `48px Arial`;
        ctx.fillStyle   = "#f00";

        ctx.fillText(
            this.score, 
            this.player === 0 ? 550 : 100, 
            100
        );
    }

    /**
    * @param {float} dt - deltaTime
    */
    update(dt)
    {
        if(this.player != 1)
        {

            const speed     =   (this.velocity.dy) * dt;

            console.log(speed);           

            //If Ball is going towards the opposite side, go back to center 
            if(this.game.ball.velocity.dx <= -1)
            {
                //Move Up
                if(this.pos.y > Math.round((this.game.canvas.height - this.size.height) / 2))
                {
                    console.log('Up');
                    this.pos.y += -speed;
                }

                //Move Down
                if(this.pos.y < Math.round((this.game.canvas.height - this.size.height) / 2))
                {
                    console.log('Down');
                    this.pos.y += speed;
                }
            }
            else 
            {
                //If Paddle Y Position is higher than Ball Y Position, Move UP 
                if(this.game.ball.velocity.dy <= -1 && this.game.ball.pos.y < (this.pos.y + (this.size.height / 2)))
                {
                    this.pos.y += -speed;
                } 
    
                //If Paddle Y Position is lower than Ball Y Position, Move Down 
                if(this.game.ball.velocity.dy >= 1 && this.game.ball.pos.y > (this.pos.y + (this.size.height / 2)))
                {
                    this.pos.y += speed;
                } 
            }

        }

        //If Paddle Pos Y Goes Below 0, Fix Position 
        if(this.pos.y <= 0)
        {
            this.pos.y =  0;
        } 
      
    
        //If Paddle Pos Y Exceeds Game Height, Fix Position
        if((this.size.height + this.pos.y) >= this.game.canvas.height)
        {
            this.pos.y = this.game.canvas.height - this.size.height;
        } 
    }

    reset()
    {
        this.pos.x      =   this.player == 1 ? 50 : (this.game.canvas.width - this.size.width) - 50;  
        this.pos.y      =   Math.round((this.game.canvas.height - this.size.height) / 2);  

        this.score      =   0; 
    }

    // Enable Controls if Player
    add_controls()
    {
        this.game.canvas.addEventListener('mousemove', (e) => 
            {
                if(this.game.state.GAME)
                {
                    this.pos.y = e.clientY - (this.size.height * 1.5); 
                }
            }
        );
    }
}