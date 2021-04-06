'use strict'; 

export class Menu
{
    constructor(game)
    {
        this.game               =       game; 
        //this.add_events(); 
        this.font_size          =       '36'; 
        this.font_family        =        'Arial';
        this.cursor             =       {
                                            'index'         :   0,
                                            'size'          :
                                            {
                                                'height'    :   25,
                                                'width'     :   25 
                                            }
                                        };

        this.set_text(); 
    }

    draw(ctx)
    {
        ctx.fillStyle   = "#000";
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        
        //Draw Text On Screen 
        ctx.font        = `${this.font_size}px ${this.font_family}`;
        ctx.fillStyle   = "#fff";

        for(let i = 0; i < this.text.length; i++)
        {
            ctx.fillText(this.text[i].name, this.text[i].pos.x, this.text[i].pos.y);
        }

        //Draw Cursor
        ctx.fillRect(this.text[this.cursor.index].pos.x - 50, this.text[this.cursor.index].pos.y - 25, this.cursor.size.width, this.cursor.size.height);
    }

    update(dt)
    {
        this.set_text(); 
    }

    set_text() 
    {
        if(this.game.state.MENU_MAIN)
        {
            this.text               =       [
                {
                    'name' : 'START GAME', 
                    'pos'  :
                    {
                        'x'    : 250, 
                        'y'    : 200, 
                    }
                },
                {
                    'name' : 'OPTIONS', 
                    'pos'  :
                    {
                        'x'    : 250, 
                        'y'    : 250, 
                    }
                }
            ];
        }
        else if(this.game.state.MENU_OPTIONS)
        {
            this.text               =       [
                {
                    'name' : `MIN BALL SPEED  :  ${this.game.config.VELOCITY_BALL_MIN}` , 
                    'pos'  :
                    {
                        'x'    : 250, 
                        'y'    : 200, 
                    }
                },
                {
                    'name' : `MAX BALL SPEED  :  ${this.game.config.VELOCITY_BALL_MAX}`, 
                    'pos'  :
                    {
                        'x'    : 250, 
                        'y'    : 250, 
                    }
                },
                {
                    'name' : `MAX SCORE      :  ${this.game.config.MAX_SCORE}`, 
                    'pos'  :
                    {
                        'x'    : 250, 
                        'y'    : 300, 
                    }
                },
                {
                    'name' : `BACK TO MAIN MENU`, 
                    'pos'  :
                    {
                        'x'    : 250, 
                        'y'    : 350, 
                    }
                }
            ];
        }

        
    }

    add_events() 
    {
        
    }
}