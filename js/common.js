$(document).ready(function() {

	$("#portfolio_grid").mixItUp();

	$(".s_portfolio li").click(function() {
		$(".s_portfolio li").removeClass("active");
		$(this).addClass("active");
	});
});
$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	$(".top_text h1").animated("fadeInDown", "fadeOutUp");
	$(".top_text p").animated("fadeInUp", "fadeOutDown");

}); 

 $(document).ready(function() {

    //Calculate the height of <header>
    //Use outerHeight() instead of height() if have padding
    var aboveHeight = $('header').outerHeight() + $('section#about').outerHeight();

//when scroll
    $(window).scroll(function(){

        //if scrolled down more than the header’s height
            if ($(window).scrollTop() > aboveHeight){

        // if yes, add “fixed” class to the <nav>
        // add padding top to the #content 
            
            $('#nav').addClass('fixed').css('top','0');
            
            // document.getElementById('main').css('padding-top','60px');

            } else {

        // when scroll up or less than aboveHeight,
            
            $('#nav').removeClass('fixed');
            // document.getElementById('main').css('padding-top','0');
            }
        });
    });

    $("a[href='#top']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });


    jQuery(document).ready(function ($) {

    /* Chart numbers absolute centering */

    var chart = $('.chart'),
        chartNr = $('.chart-content'),
        chartParent = chart.parent();

    function centerChartsNr() {

        chartNr.css({
            top: (chart.height() - chartNr.outerHeight()) / 2
        });

    }

    if (chart.length) {

        centerChartsNr();
        $(window).resize(centerChartsNr);

        chartParent.each(function () {

            $(this).onScreen({
                doIn: function () {
                    $(this).find('.chart').easyPieChart({
                        scaleColor: false,
                        lineWidth: 12,
                        size: 178,
                        trackColor: false,
                        lineCap: 'square',
                        animate: 2000,
                        onStep: function (from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                        }
                    });
                },
            });

            $(this).find('.chart').wrapAll('<div class="centertxt" />');

        });

    }

    /* Side mockups fixes */

    var sideMockup = $('.side-mockup');

    function sideMockups() {

        sideMockup.each(function () {

            var $this = $(this),
                sideMockupHeight = parseInt($this.find('.slider').height()),
                sideMockupParent = $this.parent('.row-content'),
                sideMockupParentPad = parseInt(sideMockupParent.css('padding-top')),
                sideMockupFix = sideMockupHeight + (sideMockupParentPad * 2) + 'px';

            if (!body.hasClass('mobile')) {

                if ($this.hasClass('right-mockup')) {

                    $this.css({
                        'position': 'absolute',
                        'left': '52%'
                    });

                } else if ($this.hasClass('left-mockup')) {

                    $this.css({
                        'position': 'absolute',
                        'right': '52%'
                    });

                }

                sideMockupParent.css({
                    'position': 'relative',
                    'min-height': sideMockupFix
                });

            } else {

                $this.css({
                    'position': 'relative',
                    'left': 'auto',
                    'right': 'auto'
                });

                sideMockupParent.css({
                    'position': 'relative',
                    'min-height': '0'
                });

            }

        });

    }

});