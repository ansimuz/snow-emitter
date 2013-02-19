 /**
 *  @snow-emitter.js
 *  @version: 1.00
 *  @author: Luis Zuno
 *  @date: Feb 2013
 *  @copyright (c) 2013 Luis Zuno Aka Ansimuz, under The MIT License (see LICENSE)
 *
 *  This entity will randomly spawn snowflakes all over the screen. It follows the camera so
 *  it spawn flakes on the visible area.
 *
 *  I used the debris entity from BioLab Disaster as base for this entity.
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
        count: 5,
        nextEmit: null,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.size.x = ig.system.width*2;
            this.nextEmit = new ig.Timer();
            // start right away
            this.nextEmit.set( 0 );
        },
        update: function(){
            if(  this.nextEmit.delta() >= 0 ) {
                this.nextEmit.set( this.duration / this.count );
                var x = Math.random().map( 0,1, this.pos.x, this.pos.x+this.size.x );
                var y = Math.random().map( 0,1, this.pos.y, this.pos.y+this.size.y );
                ig.game.spawnEntity( EntityParticle, x, y );
            }
            // follow player
            this.pos.x = ig.game.screen.x - ig.system.width/2 ;
            this.pos.y = ig.game.screen.y - 10;
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
        friction: {x:20, y: 0},
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
        },
        update: function() {
            if( this.pos.y > ig.game.screen.y  + ig.system.height ) {
                this.kill();
                return;
            }
            this.parent();
        },
        handleMovementTrace: function(res){
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        }
    });
});