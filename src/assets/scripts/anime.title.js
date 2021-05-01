function animeTitle(anime) {
  const textWrapper = document.querySelector('.name-company');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({loop: true})
    .add({
      targets: '.name-company .letter',
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 2250,
      delay: (el, i) => 150 * (i + 1)
    }).add({
    targets: '.name-company',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 100000
  });
}

function animeBackground(stats1) {
  const date = new Date();

  let colors = {
    color1: "rgba(255,255,255,1)",
    color2: "rgba(142,217,222,1)",
    color3: "rgba(232,248,255,1)",
    color4: "rgba(135,143,145,1)"
  }, options;
  if (date.getMonth() < 2 && date.getMonth() < 10) {
    options = {
      alphaSpeed: 10,
      alphaVariance: 1,
      color: [colors.color1, colors.color2, colors.color3, colors.color4],
      composition: "source-over",
      count: 350,
      direction: 161,
      float: 0.75,
      glow: 0,
      imageUrl: [
        "https://image.flaticon.com/icons/svg/23/23858.svg",
        "https://image.flaticon.com/icons/svg/23/23883.svg",
        "https://image.flaticon.com/icons/svg/23/23889.svg",
        "https://image.flaticon.com/icons/svg/24/24296.svg",
        "https://image.flaticon.com/icons/svg/23/23901.svg",
        "https://image.flaticon.com/icons/svg/24/24286.svg"
      ],
      maxAlpha: 2,
      maxSize: 22,
      minAlpha: -0.2,
      minSize: 4,
      parallax: 1.75,
      rotation: 0.5,
      shape: "image",
      speed: 3,
      style: "fill",
      twinkle: false,
      xVariance: 5,
      yVariance: 0,
      transition: "all 2s",
    };

    const element = document.getElementById('copyright');
    setTimeout(() => {
      element.setAttribute('style', 'box-shadow: inset 0px -50px 27px -30px #EFFFFB;')
    }, 100)


  } else if (date.getMonth() < 6 && date.getMonth() > 2) {
    options = {
      "composition": "source-over",
      "count": 400,
      "speed": 0,
      "parallax": 0,
      "direction": 180,
      "xVariance": 0,
      "yVariance": 4,
      "rotate": false,
      "rotation": 0,
      "alphaSpeed": 8,
      "alphaVariance": 4,
      "minAlpha": -1,
      "maxAlpha": 1,
      "minSize": 4,
      "maxSize": 14,
      "style": "fill",
      "bounce": false,
      "drift": 0,
      "glow": 16,
      "twinkle": true,
      "color": ["#fdfdfc",
        "#cbe4ed"],
      "shape": "diamond",
      "imageUrl": ""
    };
  } else if (date.getMonth() > 4 && date.getMonth() < 8) {
    options = {
      "composition": "lighter",
      "count": 200,
      "speed": 0,
      "parallax": 2.2,
      "direction": 30,
      "xVariance": 8.5,
      "yVariance": 4,
      "rotate": false,
      "rotation": 0,
      "alphaSpeed": 0,
      "alphaVariance": 24,
      "minAlpha": -1.8,
      "maxAlpha": 2,
      "minSize": 46,
      "maxSize": 14,
      "style": "fill",
      "bounce": false,
      "drift": 42.5,
      "glow": 31,
      "twinkle": true,
      "color": ["#fdfdfc",
        "#cbe4ed"],
      "shape": "diamond",
      "imageUrl": "https://image.shutterstock.com/image-vector/autumn-leaf-maple-isolated-on-260nw-689177599.jpg"
    }
  } else if (date.getMonth() > 7 && date.getMonth() < 10) {

    options = {

      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }
  }


  let body = document.querySelector('.snow');

  addSparticles(body, options)

  function addSparticles(node, option) {
    setTimeout(() => {
      options.transition = 'all 1s';
      let newVar = $('body').get(0);
      const perc = newVar.scrollHeight * 0.08
      if (detectMob()) {
        new stats1(node, option, newVar.scrollWidth, newVar.scrollHeight - perc)
      } else {
        new stats1(node, option, newVar.scrollWidth, newVar.scrollHeight + perc)
      }
    }, 1500)
  }

}

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function animeFooter() {
  setTimeout(() => {
    const morphing = anime({
      targets: '#footer-margin-top path',
      d: 'm-2,-110.30547c213.92539,-164.88947 427.85073,164.88946 641.77607,0l0,296.80101c-139.92534,-24.11052 -264.85068,196.11055 -641.77607,0l0,-296.80101z',
      easing: 'easeOutQuad',
      duration: 9000,
      loop: true,
      direction: 'alternate',
      margin: -1 % 11.5 % 0,
      fill: 'transparent',
    });
  }, 1000)

}

function animeMenu() {
  const GLOBAL_CFG = {
    loop: true
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  let swetCollection = document.querySelectorAll('.swet')

  swetCollection.forEach((el, index) => {
    anime({
      ...GLOBAL_CFG,
      targets: el,
      opacity: [0, 1, 0],
      delay: index * 100,
      duration: index * 1500,
      translateY: index * 2,
      easing: 'easeInOutSine'
    })
  })

  let spitCollection = document.querySelectorAll('.spit')

  spitCollection.forEach((el, index) => {
    anime({
      ...GLOBAL_CFG,
      targets: el,
      opacity: [0, 1, 0],
      delay: 500,
      duration: index * 1000,
      translateY: getRndInteger(-30, 30),
      translateX: getRndInteger(-30, 30),
      easing: 'easeInOutSine'
    })
  })
  let debreCollection = document.querySelectorAll('.debre')

  debreCollection.forEach((el, index) => {
    anime({
      ...GLOBAL_CFG,
      targets: el,
      opacity: [0, 1, 0],
      delay: index * 100,
      duration: index * 100,
      scaleX: 1.3,
      scaleY: 1.3,
      translateY: getRndInteger(-10, -40),
      translateX: getRndInteger(-30, 30),
      easing: 'linear'
    })
  })

  const GEAR1 = anime({
    ...GLOBAL_CFG,
    targets: '#gear1 path',
    rotate: 360,
    easing: 'linear'
  })
  const GEAR2 = anime({
    ...GLOBAL_CFG,
    targets: '#gear2 path',
    rotate: -360,
    easing: 'linear'
  })
  const SHORT_ARROW = anime({
    ...GLOBAL_CFG,
    targets: '#shortArrow',
    rotate: 360,
    duration: 10000,
    easing: 'linear',
    transformOrigin: ['4px 25px 0', '6px 27px 0']
  })
  const LONG_ARROW = anime({
    ...GLOBAL_CFG,
    targets: '#longArrow',
    rotate: 360,
    duration: 800,
    easing: 'linear',
    transformOrigin: ['2px 32px 0', '10px 39px 0']
  })
  const LEFT_HAND = anime({
    ...GLOBAL_CFG,
    targets: '#leftHand',
    rotate: 6,
    duration: 1000,
    direction: 'alternate',
    easing: 'easeInOutQuart',
    transformOrigin: ['2px 32px 0', '10px 39px 0']
  })
  const LEFT_PALM = anime({
    ...GLOBAL_CFG,
    targets: '#leftPalm',
    translateX: -10,
    duration: 1000,
    direction: 'alternate',
    easing: 'easeInOutQuart',
    transformOrigin: ['2px 32px 0', '10px 39px 0']
  })
  const RIGHT_HAND = anime({
    ...GLOBAL_CFG,
    targets: '#rightHand',
    rotate: 6,
    duration: 500,
    direction: 'alternate',
    easing: 'easeInOutBack',
    transformOrigin: ['280px 120px 0', '280px 120px 0']
  })

  const RIGHT_PALM = anime({
    ...GLOBAL_CFG,
    targets: '#rightPalm',
    rotate: 6,
    translateX: '-15px',
    translateY: '-5px',
    duration: 500,
    direction: 'alternate',
    easing: 'easeInOutBack',
    transformOrigin: ['30px 30px 0', '30px 30px 0']
  })
  const PEN = anime({
    ...GLOBAL_CFG,
    targets: '#pen',
    rotate: 8,
    translateX: '-15px',
    translateY: '-5px',
    duration: 500,
    direction: 'alternate',
    easing: 'easeInOutBack',
    transformOrigin: ['30px 30px 0', '30px 30px 0']
  })
  const MOUTH = anime({
    ...GLOBAL_CFG,
    targets: '#mounth',
    rotate: 2,
    scaleX: 1.1,
    scaleY: [1.2, .9],
    duration: 1500,
    direction: 'alternate',
    easing: 'easeInOutElastic',
    transformOrigin: ['30px 30px 0', '30px 30px 0']
  })
  const TONGUE = anime({
    ...GLOBAL_CFG,
    targets: '#tongue',
    rotate: -5,
    scaleX: 1.2,
    scaleY: [1.1, .6],
    duration: 1500,
    direction: 'alternate',
    easing: 'easeInOutElastic',
    transformOrigin: ['30px 10px 0', '30px 10px 0']
  })
  const HEAD = anime({
    ...GLOBAL_CFG,
    targets: '#head',
    rotate: -5,
    duration: 1500,
    direction: 'alternate',
    easing: 'easeInOutSine',
    transformOrigin: ['200px 200px 0', '200px 200px 0']
  })
  const HAIR1 = anime({
    ...GLOBAL_CFG,
    targets: '#hair1',
    rotate: -3,
    duration: 1500,
    direction: 'alternate',
    easing: 'easeInOutSine',
    transformOrigin: ['200px 200px 0', '200px 200px 0']
  })
  const HAIR2 = anime({
    ...GLOBAL_CFG,
    targets: '#hair2',
    rotate: -4,
    duration: 1500,
    direction: 'alternate',
    easing: 'easeInOutSine',
    transformOrigin: ['100px 180px 0', '100px 180px 0']
  })
  const BRAW = anime({
    ...GLOBAL_CFG,
    targets: '#brows',
    rotate: -10,
    duration: 500,
    direction: 'alternate',
    easing: 'easeInOutSine',
  })
  const EYE1 = anime({
    ...GLOBAL_CFG,
    targets: '#leftEye',
    duration: 2000,
    scaleY: [.4],
    direction: 'alternate',
    easing: 'easeInOutSine',
  })
  const EYE2 = anime({
    ...GLOBAL_CFG,
    targets: '#rghtEye',
    duration: 2000,
    scaleY: [.6],
    direction: 'alternate',
    easing: 'easeInOutSine',
  })
  const FLASH1 = anime({
    ...GLOBAL_CFG,
    targets: '#flash1',
    duration: getRndInteger(400, 500),
    scaleY: [.6],
    scaleX: [.6],
    rotate: getRndInteger(-4, 4),
    opacity: [0, .7, 0],
    easing: 'easeInOutSine',
  })
  const FLASH2 = anime({
    ...GLOBAL_CFG,
    targets: '#flash2',
    delay: 500,
    duration: getRndInteger(400, 500),
    scaleY: [.6],
    scaleX: [.6],
    rotate: getRndInteger(-4, 4),
    opacity: [0, .7, 0],
    easing: 'easeInOutSine',
  })
  const FLASH3 = anime({
    ...GLOBAL_CFG,
    targets: '#whiteFlash1',
    duration: 1000,
    opacity: [0, 0, .9, .7, .7, 0],
    easing: 'easeOutQuint',
  })
  const FLASH4 = anime({
    ...GLOBAL_CFG,
    targets: '#whiteFlash2',
    duration: 900,
    delay: 200,
    opacity: [0, .6, 0],
    easing: 'linear',
  })
  const PAPER = anime({
    ...GLOBAL_CFG,
    targets: '#paper1',
    delay: 500,
    duration: 3500,
    scaleY: [0, .6],
    scaleX: [0, .6],
    translateX: [-200, -100],
    translateY: [-200, -100],
    rotate: getRndInteger(-400, -100),
    opacity: [0.3, .7, 0],
    easing: 'easeInOutSine',
  })

}

function animateHeader() {

  (function ($) {
    $(function () {
      $('.menu ul li a:not(:only-child)').click(function (e) {
        $(this).siblings('.nav-dropdown').toggle(200);
        $('.dropdown').not($(this).siblings()).hide(200);
        e.stopPropagation();
      });
      $('html').click(function () {
        $('.nav-dropdown').hide(200);
      });
      $('#nav-toggle').click(function () {
        $('nav ul').slideToggle();
      });
      $('#nav-toggle').on('click', function () {
        this.classList.toggle('active');
      });
    });
  })(jQuery);

  const $menu = $('.menu');

  $(document).mouseup(e => {
    if (!$menu.is(e.target) // if the target of the click isn't the container...
      && $menu.has(e.target).length === 0) // ... nor a descendant of the container
    {
      $menu.removeClass('is-active');
    }
  });

  $('a').on('click', () => {

    $menu.toggleClass('is-active');
  });

}

function animeAdminMenu() {
  (function ($) {
    $(function () {
      $('.amin-menu  a:not(:only-child)').click(function (e) {
        $(this).siblings('.nav-dropdown').toggle(200);
        $('.dropdown').not($(this).siblings()).hide(200);
        e.stopPropagation();
      });
      $('#nav-toggle').click(function () {
        $('nav ul').slideToggle();
      });
      $('#nav-toggle').on('click', function () {
        this.classList.toggle('active');
      });
    });
  })(jQuery);
}
