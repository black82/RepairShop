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
  console.log("animeBackground")
  let colors = {
      color1: "rgba(255,255,255,1)",
      color2: "rgba(142,217,222,1)",
      color3: "rgba(232,248,255,1)",
      color4: "rgba(135,143,145,1)"
    },
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
    };
  console.log('width')
  const selector = document.querySelector('.sparticles');
  if (selector) {
    selector.className = '';
    document.body.removeChild(selector);
    console.log(selector);
  }
  let body = document.querySelector('.snow');

  addSparticles(body, options, stats1)

  function addSparticles(node, option, st) {
    let newVar = $('body').get(0);
    new stats1(node, option, newVar.scrollWidth, (document.body.offsetHeight * 2) - 189);
  }

}

