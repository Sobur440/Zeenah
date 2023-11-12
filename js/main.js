// imports

import "../css/style.css"
import arrivals from "./arrival.js"

//*Dom elements

const menuBtn = document.querySelector(".menu__btn__container")
const navLinksContainer = document.querySelector(".nav__links__container")
const navLinks = document.querySelectorAll(".link")
const closeMenuBtn = document.querySelector(".close__btn")
const sliderContainer = document.querySelector(".men__women__kids__container")
const sliderElements = document.querySelectorAll(".category__container")
const dot1 = document.querySelector(".cert__dot1")
const dot2 = document.querySelector(".cert__dot2")
const dot3 = document.querySelector(".cert__dot3")
const collections = document.querySelectorAll(".collection__list__text")
const bracelet = document.querySelector(".bracelet__text")
const goodsContainer = document.querySelector(".goods__container")

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
}


document.addEventListener("DOMContentLoaded", () => {

    smoothScroll()
    
    class arrivalsClass {
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
        const good = new arrivalsClass(arrival.name, arrival.image, arrival.price)
        goodsContainer.innerHTML += good.render()
    })
    
    
    
    
    
    
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
    
    

})

