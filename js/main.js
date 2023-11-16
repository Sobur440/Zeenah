// imports

import "../css/style.css"
import arrivals from "./arrival.js"

//*Dom elements

const menuBtn = document.querySelector(".menu__btn")
const navLinksContainer = document.querySelector(".nav__links__container")
const navLinks = document.querySelectorAll(".link")
const closeMenuBtn = document.querySelector(".close__btn")
const sliderContainer = document.querySelector(".men__women__kids__container")
const sliderElements = document.querySelectorAll(".category__container")
const dot1 = document.querySelector(".cert__dot1")
const dot2 = document.querySelector(".cert__dot2")
const dot3 = document.querySelector(".cert__dot3")
const categories = document.querySelectorAll(".category")
const collections = document.querySelectorAll(".collection__list__text")
const bracelet = document.querySelector(".bracelet__text")
const goodsContainer = document.querySelector(".goods__container")
const toTop = document.querySelectorAll(".top__links")
const leftArrow = document.querySelector(".left__arrow")
const rightArrow = document.querySelector(".right__arrow")

// Implementing smooth scroll with lenis

const smoothScroll = () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    toTop.forEach(top => {
        top.addEventListener("click", () => {
            lenis.scrollTo('#top')
        })
    })

}


document.addEventListener("DOMContentLoaded", () => {

    interactions()
    smoothScroll()
    
    class ArrivalsClass {
        constructor(name, image, price) {
            this.name = name
            this.image = image
            this.price = price
        }
    
        render() {
            return `
                <div class="goods__details">
                    <div class="good__image__container"><img src=${this.image} alt=${this.name} class="good__image" /></div>
                    <p class="good__name">${this.name}</p>
                    <p class="good__price">${this.price}</p>
                </div>
            `
        }
    }
    
    arrivals.forEach(arrival => {
        const good = new ArrivalsClass(arrival.name, arrival.image, arrival.price)
        goodsContainer.innerHTML += good.render()
    })

    // Arrivals Interaction
    const arrivalsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                gsap.timeline()
                .to(".goods__details", {
                    y: 0,
                    opacity: 1,
                    stagger: {amount: 1}
                })
                .to(".title__and__shop__all__link__container, .arrows__container", {
                    opacity: 1
                })

            }
        })
    })
    const arrEls = document.querySelectorAll(".goods__details")

    rightArrow.addEventListener("click", () => {
        goodsContainer.scrollBy({
            top: 0,
            left: 700,
            behavior: "smooth"
        })
    })
    leftArrow.addEventListener("click", () => {
        goodsContainer.scrollBy({
            top: 0,
            left: -700,
            behavior: "smooth"
        })
    })

    // Category Animatiom
    const catObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const targetElement = entry.target
            if(entry.isIntersecting) {
                gsap.to(".category__container", {
                    y: 0,
                    opacity: 1,
                    stagger: {amount: 0.5}
                })
            }
        })
    }, {
        threshold: 0.5
    })
    
    const catContainers = document.querySelectorAll(".category__container")

    arrEls.forEach(arrEl => {
        arrivalsObserver.observe(arrEl)
    })
    catContainers.forEach(catContainer => {
        catObserver.observe(catContainer)
    })

    // collections

    const collectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                gsap.to(".collections__list__container", {
                    clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
                    onComplete: collectionsImageChange
                })
            }
        })
    })
    collectionObserver.observe(document.querySelector(".collections__list__container"))
    
    
    
    // Nav Menu
    
    menuBtn.addEventListener("click", () => {
        navLinksContainer.classList.add("down")
        document.body.style.overflow = "hidden"
    })
    
    for(const navLink of navLinks) {
        navLink.addEventListener("click", () => {
            navLinksContainer.classList.remove("down")
            document.body.style.overflow = "auto"
        })
    }
    
    closeMenuBtn.addEventListener("click", () => {
        navLinksContainer.classList.remove("down")
        document.body.style.overflow = "auto"
    })
    
    // category slider
    
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                if(entry.target.classList.contains("men__container")) {
                    dot1.classList.add("focus")
                    dot2.classList.remove("focus")
                    dot3.classList.remove("focus")
                } else if(entry.target.classList.contains("women__container")) {
                    dot1.classList.remove("focus")
                    dot2.classList.add("focus")
                    dot3.classList.remove("focus")
                } else if(entry.target.classList.contains("kids__container")) {
                    dot1.classList.remove("focus")
                    dot2.classList.remove("focus")
                    dot3.classList.add("focus")
                }
            }
        })
    },
    {
        root: sliderContainer,
        rootMargin: "0px",
        threshold: 0.8
    }
    )
    
    sliderElements.forEach(sliderElement => {
        sliderObserver.observe(sliderElement)    
    })

    // Categories Interactions

    const catImgContainerClasses = [
        "men__category__img",
        "women__category__img",
        "kids__category__img"
    ]

    const catTextClasses = [
        "men__text",
        "women__text",
        "kids__text"
    ]

    categories.forEach(category => {
        category.addEventListener("mouseover", (e) => {
            const targetClass = category.classList[2]
            catImgContainerClasses.forEach(catImgContainerClass => {
                const match = document.querySelector(`.${catImgContainerClass}`).classList.contains(targetClass)
                if(match) {
                    addClass(catImgContainerClass, "category__img__focus")
                } else {
                    removeClass(catImgContainerClass, "category__img__focus")
                }
                
            })

            catTextClasses.forEach(catTextClass => {
                const match = document.querySelector("." + catTextClass).classList.contains(targetClass)
                if(match) {
                    addClass(catTextClass, "category__focus")
                } else {
                    removeClass(catTextClass, "category__focus")
                }
            })

        })
    })



    // collections Interaction
    
    const imgContainerClasses = [
        "earrings__img__container",
        "bracelets__img__container",
        "socks__img__container",
        "necklace__img__container",
        "anklet__img__container",
        "watch__img__container",
        "underwear__img__container",
        "perfume__img__container",
        "legins__img__container",
        "towels__img__container",
        "rings__img__container"
    ]
      
    const textClasses = [
        "ring__text",
        "necklace__text",
        "anklet__text",
        "watch__text",
        "earrings__text",
        "socks__text",
        "towel__text",
        "underwear__text",
        "perfume__text",
        "legins__text",
        "bracelet__text"
    ]
    
    const addClass = (selector, className) => {
        document.querySelector("." + selector).classList.add(className)
    } 
    
    const removeClass = (selector, className) => {
        document.querySelector("." + selector).classList.remove(className)
    }
    
    const collectionsImageChange = () => {


        collections.forEach(collection => {
            collection.addEventListener("mouseover", (e) => {
                const targetClass = e.target.classList[2]
        
                imgContainerClasses.forEach(imgContainerClass => {
                    const match = document.querySelector("." + imgContainerClass).classList.contains(targetClass)
                    if(match) {
                        addClass(imgContainerClass, "collection__img__container__active")
                    } else {
                        removeClass(imgContainerClass, "collection__img__container__active")
                    }
                })
        
                textClasses.forEach(textClass => {
                    if(e.target.classList.contains(textClass)) {
                        addClass(textClass, "collection__list__text__active")
                    } else {
                        removeClass(textClass, "collection__list__text__active")
                        
                    }
                })
            })

        })


    }



})

const preloader = () => {
    const counter = document.querySelector(".counter")
    let count = 0
    
    const updateCounter = () => {
        count += Math.floor(Math.random() * 10) + 1
        if(count >= 100) {
            count = Math.min(count, 100)
        }

        counter.textContent = count + "%"

    }
    
    setTimeout(() => {
        setInterval(updateCounter, 560)
    }, 400)
}
preloader()

const interactions = () => {

    const tl = gsap.timeline()


    tl.to(".intro", {
        y: 0,
        opacity: 1,
        delay: 0.3
    })
    .to(".intro", {
        y: -50,
        opacity: 0,
        delay: 11.5,
    })
    .to(".waiting, .counter", {
        opacity: 0,
    })
    .to(".loader", {
        scale: 0,
    })
    .set(".loader", {
        display: "none"
    })
    .to(".hero", {
        clipPath: "polygon(91% 34%, 12% 33%, 11% 61%, 91% 61%)",
        ease: "power4.out",
    })
    .to(".hero", {
        clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        delay: "0.3",
        scale: 1,
        ease: "power4.out"
    }).to(".title__letter", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        y: 0,
        opacity: 1,
        stagger: {amount: 0.5},
        delay: 0.1,
        onComplete: () => {
            document.body.style.overflowY = "auto"
        }
    })
    .to(".navbar", {
        top: 0,
        duration: 1,
        ease: "power2.out"
    })
    .from(".topics", {
        opacity: 0,
        duration: 1
    }, "<")


    //About animation
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                gsap.to(".about__text", {
                    opacity: 1,
                    y: 0,
                    ease: "power4.out",
                    duration: 1
                })
            }
        })
    },
    {
        threshold: 1
    } 
    )

    aboutObserver.observe(document.querySelector(".about"))

    const newsletterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                gsap.to(".stay", {
                    opacity: 1,
                    y: 0,
                    ease: "power4.out",
                    stagger: {amount: 0.5}
                })
            }
        })
    },
    {
        threshold: 1
    } 
    )

    newsletterObserver.observe(document.querySelector(".newsletter__title__container"))



}
