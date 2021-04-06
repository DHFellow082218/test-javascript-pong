'use strict'; 

export class Ball
{
    /**
     * @param  {object} game
     * @param  {object} pos
     * @param  {object} size
     * @param  {object} velocity
     */
    constructor(game, pos, size, velocity)
    {
        this.game       =   game; 
        this.pos        =   pos; 
        this.size       =   size; 
        this.velocity   =   velocity;
     
        this.pos.x      =   (this.game.canvas.width - this.size.width) / 2; 
        this.pos.y      =   (this.game.canvas.height - this.size.height) / 2; 
    }

    /**
    * @param  {Canvas2dContext} ctx
    */
    draw(ctx) 
    {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    }

    /**
    * @param {float} dt - deltaTime
    */
    update(dt)
    {
        this.pos.x      +=      this.velocity.dx * dt; 
        this.pos.y      +=      this.velocity.dy * dt; 

      
        // Check if Ball hits Top Boundary 
        if(this.pos.y <= 0)
        {
            this.pos.y              =       0; 

            if(Math.abs(this.velocity.dy) < this.game.config.VELOCITY_BALL_MAX)
            {
                this.velocity.dy--; 
            }

            this.velocity.dy        *=      -1; 
            //console.log(this.pos.y)
        }

        // Check if Ball hits Bottom Boundary 
        if((this.pos.y + this.size.height) >= this.game.canvas.height)
        {
            this.pos.y              =       this.game.canvas.height - this.size.height; 

            if(Math.abs(this.velocity.dy) < this.game.config.VELOCITY_BALL_MAX)
            {
                this.velocity.dy++; 
            }

            this.velocity.dy        *=       -1; 
            //console.log(this.pos.y)
        }

        // Check if Ball hits Left Boundary 
        if(this.pos.x <= 0)
        {  
            this.velocity.dx        *=      -1; 
            this.game.paddle_enemy.score++; 

            this.game.sound.play('SCORE');
            this.reset(); 
        }
 
        // Check if Ball hits Right Boundary 
        if((this.pos.x + this.size.width) >= this.game.canvas.width)
        {
            this.velocity.dx        *=      -1; 
            this.game.paddle_player.score++; 
         
            this.game.sound.play('SCORE');
            this.reset();
        }

        //Handle Paddle Collision 
        if(this.game.config.DEBUG_PADDLE_COLLISION)
        {
            if(this.game.check_collision(this, this.game.paddle_player))
            {
                if(Math.abs(this.velocity.dx)  < this.game.config.VELOCITY_BALL_MAX)
                {
                    this.velocity.dx--; 
                }

                this.pos.x              +=       5; 
                this.velocity.dy        *=       1; 
                this.velocity.dx        *=       -1; 

                this.game.sound.play('BALL_BOUNCE');
            }
    
            if(this.game.check_collision(this, this.game.paddle_enemy))
            {
                if(Math.abs(this.velocity.dx)  < this.game.config.VELOCITY_BALL_MAX)
                {
                    this.velocity.dx++; 
                }
                
                this.pos.x              -=       5; 
                this.velocity.dy        *=       1; 
                this.velocity.dx        *=       -1; 

                this.game.sound.play('BALL_BOUNCE');
            }
        }
    }

    reset()
    {
        this.pos.x      =   (this.game.canvas.width - this.size.width) / 2; 
        this.pos.y      =   (this.game.canvas.height - this.size.height) / 2; 
    }
}