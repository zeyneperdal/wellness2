$(document).ready(function() {
 var wellnessMessages = [
    { title: "Discover", message: "Spot new opportunities." },
    { title: "Envolve", message: "The potential flows through you." },
    { title: "Expand", message: "Growth is often uncomfortable and messy, but necessary." },
    { title: "Inspire", message: "There is a fire inside you burning brighter than the sun." },
    { title: "Limitless", message: "Know your worth." },
    { title: "Love", message: "… to the moon and back." },
    { title: "Outer Space", message: "Take the time to heal, grow and expand." },
    { title: "Re-evaluate", message: "In the starlit sky we still look for the falling stars." },
    { title: "Replenish", message: "The sun will rise and we will try again." },
    { title: "Take Charge", message: "Don’t wait for the stars to align, reach up and arrange them the way you want." },
    { title: "The Sun", message: "Rise to the occasion." },
    { title: "The Moon", message: "Take time to reflect." },
    { title: "Adapt", message: "You will get yourself where you want to be." },
    { title: "Be Present", message: "Use the hours; don’t count them." },
    { title: "Beginnings", message: "Don’t be afraid to start small." },
    { title: "Change", message: "As with the falling leave, embrace change." },
    { title: "Courage", message: "When picking roses, don’t fear the thorns." },
    { title: "Dare", message: "Take a risk and fly." },
    { title: "Find", message: "Look at the early dew drops before they disappear with morning sun." },
    { title: "Grow", message: "All flowers must grow through dirt." },
    { title: "Hidden Depths", message: "You only see the surface; look beyond." },
    { title: "Joy", message: "Make time for the little things today." },
    { title: "Move", message: "A rolling stone gathers no moss." },
    { title: "Opportunity", message: "There is no use looking for luck; it arrives at unexpected times." },
    { title: "Persevere", message: "Leave no stone unturned." },
    { title: "Potential", message: "The littlest key can open the heaviest door." },
    { title: "Release", message: "Lighten your load." },
    { title: "Rest", message: "Slow down; you don’t have to solve everything today." },
    { title: "Retreat", message: "Never underestimate the healing power of a quiet moment." },
    { title: "Share", message: "The busy bee should still make time for each flower." },
    { title: "Success", message: "Bloom wherever you are planted." },
    { title: "Surprises", message: "Venture down the rabbit hole." },
    { title: "Transform", message: "Rise above any situation and become the best version of you." },
    { title: "Wallflower", message: "Look for the crack in the concrete to find your way out." }
];


    function getRandomMessage() {
        var randomIndex = Math.floor(Math.random() * wellnessMessages.length);
        var selectedMessage = wellnessMessages[randomIndex];
        return '<span class="message-title">' + selectedMessage.title + ':</span> ' +
               '<span class="message-content">' + selectedMessage.message + '</span>';
    }

    $.fn.animateRotate = function(angle, duration, easing, complete) {
        var args = $.speed(duration, easing, complete);
        var step = args.step;
        return this.each(function(i, e) {
            args.complete = $.proxy(args.complete, e);
            args.step = function(now) {
                $.style(e, 'transform', 'rotate(' + now + 'deg)');
                if (step) return step.apply(e, arguments);
            };

            $({deg: 0}).animate({deg: angle}, args);
        });
    };

    $("#main-page").css("background-color", "#927397");
    $("#main-page").css("height", "100vh");
    $("#main-page").css("width", "100%");
    $("#main-page").fadeIn();
    $(".maincontent").fadeIn();

    $(".mainlink").on("click", function() {
        var lastShownDate = localStorage.getItem('lastShownDate');
        var today = new Date().toDateString();

        if (lastShownDate !== today) {
            var message = getRandomMessage();
            $("#message-display").html(message);
            localStorage.setItem('lastShownDate', today);
            localStorage.setItem('todaysMessage', message);

            $(".maincontent").fadeOut();
            $("#main-page").animate({
                width: "25px",
                height: "375px"
            }, function() {
                $(this).animateRotate(90);
            });

            setTimeout(function() {
                $("#main-page").fadeOut();       
            }, 1500);

            setTimeout(function() {
                $("#next-page").animateRotate(0, 0);
                $("#next-page").css("height", "25px");
                $("#next-page").css("width", "375px");
                $("#next-page").fadeIn();
                $("#next-page").animate({
                    backgroundColor: "#9EA2AD"
                }, function() {
                    $(this).animate({
                        height: "100vh"
                    }, function() {
                        $(this).animate({
                            width: "100%"
                        }, function() {
                            $(".nextcontent").fadeIn(300);
                        });
                    });
                });
            }, 800);
        } else {
            var todaysMessage = localStorage.getItem('todaysMessage');
            $("#warning-message").text("Naughty naughty, please take only one card a day.").show();
            $("#daily-message-title").text("Please see your daily message below:").show();
            $("#daily-message").html(todaysMessage).show();
            $(this).hide();
        }
    });

    $(".nextlink").on("click", function() {
        $(".nextcontent").fadeOut();
        $("#next-page").animate({
            width: "25px",
            height: "375px"
        }, function() {
            $(this).animateRotate(-90);
        });

        setTimeout(function() {
            $("#next-page").fadeOut();
        }, 1500);

        setTimeout(function() {
            $("#main-page").animateRotate(0, 0);
            $("#main-page").css("height", "25px");
            $("#main-page").css("width", "375px");
            $("#main-page").fadeIn();
            $("#main-page").animate({
                height: "100vh"
            }, function() {
                $(this).animate({
                    width: "100%"
                }, function() {
                    $(".maincontent").fadeIn(300);
                });
            });
        }, 1400);

        var todaysMessage = localStorage.getItem('todaysMessage');
        if (todaysMessage) {
            $("#message-display").html(todaysMessage);
        }
    });
});
