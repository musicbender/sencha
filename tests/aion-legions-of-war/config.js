const url = process.env.NCWEBTEST_FUNC_URL;

module.exports = {
  site: {
    "title": "Aion Legions of War",
    "funcURLS": {
      "dev": "http://local.aionlegionsofwar.com:3000/en",
      "qa": "http://www-qa.aionlegionsofwar.com/en",
      "live": "http://www.aionlegionsofwar.com/en"
    },
    globalFuncTests: {
      shouldRun: true,
      excludeSuites: ["gnb"]
    }
  },
  global: {
    nullClick: '#app',
    defaultTimeout: '30s',
    baseURL: url,
    imgDev: 'http://local.aionlegionsofwar.com:3000/Users/pjacobs/nc-projects/com_aionlegionsofwar/src/'
  },
  navigation: {
    navElm: '#menu > .inner-nav',
    logo: '.navbar .nav-logo-link'
  },
  footer: {
    footerElm: ".footer",
    logo: ".footer .ncsoft-logo",
    links: ".footer .footer-links"
  },
  home: {
    url,
    bgVideoWrapper: '#video-wrapper',
    bgVideoIframe: '#bg-header-video',
    mainBanner: {
      header: '.home-header',
      logo: '.home-header > .main-logo',
      register: '.home-header > .register-wrapper',
      signupForm: '.home-header form.signup-form'
    },
    slidesMax: 6,
    slider: '.slick-initialized.slick-slider.screenshot-slider',
    slickActive: '.slick-slide.slick-active.item-',
    arrows: {
      next: 'button.slick-arrow.slick-next',
      prev: 'button.slick-arrow.slick-prev'
    },
    videoModal:'.ReactModalPortal .video-modal',
    imageModal:'.ReactModalPortal .ril-outer',
    rewards: {
      rewardsElm: '#rewards',
      socialBtns: [
        '#rewards .rewards-button.signup',
        '#rewards .rewards-button.share',
        '#rewards .rewards-button.likeAndFollow',
        '#rewards .rewards-button.referFriends'
      ],
      socialModals: [
        '.popup.popup-signup.open-true',
        '.popup.popup-share.open-true',
        '.popup.popup-likeAndFollow.open-true',
        '.popup.popup-referFriends.open-true'
      ],
      modalButtons: {
        share: [
          ".facebook",
          ".twitter",
          ".tumblr"
        ],
        likeAndFollow: [
          ".facebook",
          ".twitter",
          ".instagram",
          ".youtube",
          ".tumblr"
        ],
        referFriends: [
          ".twitter",
          ".facebook",
          ".google",
          ".whatsapp",
          ".line",
          ".wechat"
        ]
      }
    }
  }
}
