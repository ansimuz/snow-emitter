 /**
 *  @snow-emitter.js
 *  @version: 2.0
 *  @author: Luis Zuno
 *  @date: Feb 2013
 *  @copyright (c) 2013 Luis Zuno Aka Ansimuz, under The MIT License (see LICENSE)
 *
 *  This entity will randomly spawn snowflakes all over the screen. 
 */

ig.module(
    'game.entities.snow-emitter'
).requires(
    'impact.entity'
).defines(function(){

    EntitySnowEmitter = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 170, 66, 0.7)',
        duration: 1,
        count: 11,
        nextEmit: null,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.size.x = ig.system.width;
            this.nextEmit = new ig.Timer();
            // start right away
            this.nextEmit.set( 0 );
        },
        update: function(){
            if(  this.nextEmit.delta() >= 0 && this.count > 0 ) {
                this.count--;
                this.nextEmit.set( this.duration / this.count );
                var x = this.randomRange(ig.game.screen.x, ig.game.screen.x + ig.system.width);
                var y = ig.game.screen.y;
                ig.game.spawnEntity( EntityParticle, x, y );
            }
        },
        randomRange: function(min, max){
            return Math.random() * (max - min) + min;
        }
    });
    EntityParticle = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/snow-flake.png', 1 ,1 ),
        size: {x: 1, y: 1},
        offset: {x: 0, y: 0},
        vel: {x: 60, y: 11},
        maxVel: {x: 44, y: 44},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        bounciness: 0,
        friction: {x:0, y: 0},
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
        },
        update: function() {
            if( this.pos.y > ig.game.screen.y  + ig.system.height ) {
                // move it to the top screen
               this.pos.y = ig.game.screen.y - 0;
            }
            // out of right bound
            if(this.pos.x > ig.game.screen.x + ig.system.width){
                this.pos.x = ig.game.screen.x;
            }
            // out of left bound
            if(this.pos.x < ig.game.screen.x){
                this.pos.x = ig.game.screen.x + ig.system.width;
            }
            this.parent();
        },
        handleMovementTrace: function(res){
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        }
    });
});