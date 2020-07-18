/* Background animations */
var sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
];

var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
};

var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
};

var background1 = document.getElementById('background1');
var background2 = document.getElementById('background2');

var background1Movement = background1.animate(
    sceneryFrames, sceneryTimingBackground);
background1Movement.currentTime = 36000 / 2;

var background2Movement = background2.animate(
    sceneryFrames, sceneryTimingBackground);

var foreground1 = document.getElementById('foreground1');
var foreground2 = document.getElementById('foreground2');

var foreground1Movement = foreground1.animate(
    sceneryFrames, sceneryTimingForeground);
foreground1Movement.currentTime = 12000 / 2;

var foreground2Movement = foreground2.animate(
    sceneryFrames, sceneryTimingForeground);

var spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
];

var redQueen_alice_sprite = document.getElementById('red-queen_and_alice_sprite');

var redQueen_alice = redQueen_alice_sprite.animate(
    spriteFrames, {
    easing: 'steps(7, end)',
    direction: "reverse",
    duration: 600,
    playbackRate: 1,
    iterations: Infinity
});

/* Alice tires so easily! 
  Every so many seconds, reduce their playback rate so they slow a little. 
*/
var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

var adjustBackgroundPlayback = function () {
    if (redQueen_alice.playbackRate < .8) {
        sceneries.forEach(function (anim) {
            anim.playbackRate = redQueen_alice.playbackRate / 2 * -1;
        });
    } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
            anim.playbackRate = redQueen_alice.playbackRate / 2;
        });
    } else {
        sceneries.forEach(function (anim) {
            anim.playbackRate = 0;
        });
    }
}
adjustBackgroundPlayback();

/* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
/* But if they fall under 1, the background slides backwards */
setInterval(function () {
    /* Set decay */
    if (redQueen_alice.playbackRate > .4) {
        redQueen_alice.playbackRate *= .9;
    }
    adjustBackgroundPlayback();
}, 3000);

var goFaster = function () {
    /* But you can speed them up by giving the screen a click or a tap. */
    redQueen_alice.playbackRate *= 1.1;
    adjustBackgroundPlayback();
}

document.addEventListener("click", goFaster);
document.addEventListener("touchstart", goFaster);