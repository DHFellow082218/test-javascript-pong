'use strict'

export class Sound
{
    constructor(game)
    {
        this.game           =       game; 
        this.sfx            =       {
                                        "BALL_BOUNCE"   : new Audio('/public/assets/sfx/bounce.mp3'),
                                        "GAME_OVER"     : new Audio('/public/assets/sfx/game_over.wav'),
                                        "PAUSE"         : new Audio('/public/assets/sfx/pause.wav'),
                                        "SCORE"         : new Audio('/public/assets/sfx/score.wav')
                                    };
                                           
        console.log('Hello');
    }

    /**
     * Play Sound 
     * param {string} sound - filename 
     */
    play(sound)
    {
        switch(sound)
        {
            case 'BALL_BOUNCE': 
                this.sfx.BALL_BOUNCE.play(); 
                break;

            case 'GAME_OVER': 
                this.sfx.GAME_OVER.play(); 
                break; 

            case 'PAUSE': 
                this.sfx.PAUSE.play(); 
                break;

            case 'SCORE': 
                this.sfx.SCORE.play(); 
                break; 
        }
    }
}