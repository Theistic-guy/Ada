// import { div } from "framer-motion/client";

const DropPage=()=>{
    
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let carousel = document.querySelector('.carousel');
    let items = document.querySelectorAll('.carousel .item');
    let countItem = items.length;
    let active = 1;
    let other_1 = null;
    let other_2 = null;
    next.onclick = () => {
        carousel.classList.remove('prev');
        carousel.classList.add('next');
        active =active + 1 >= countItem ? 0 : active + 1;
        other_1 =active - 1 < 0 ? countItem -1 : active - 1;
        other_2 = active + 1 >= countItem ? 0 : active + 1;
        changeSlider();
    }
    prev.onClick = () => {
        carousel.classList.remove('next');
        carousel.classList.add('prev');
        active = active - 1 < 0 ? countItem - 1 : active - 1;
        other_1 = active + 1 >= countItem ? 0 : active + 1;
        other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
        changeSlider();
    }
    const changeSlider = () => {
        let itemOldActive = document.querySelector('.carousel .item.active');
        if(itemOldActive) itemOldActive.classList.remove('active');

        let itemOldOther_1 = document.querySelector('.carousel .item.other_1');
        if(itemOldOther_1) itemOldOther_1.classList.remove('other_1');

        let itemOldOther_2 = document.querySelector('.carousel .item.other_2');
        if(itemOldOther_2) itemOldOther_2.classList.remove('other_2');

        items.forEach(e => {
            e.querySelector('.image img').style.animation = 'none';
            e.querySelector('.image figcaption').style.animation = 'none';
            void e.offsetWidth;
            e.querySelector('.image img').style.animation = '';
            e.querySelector('.image figcaption').style.animation = '';
        })

        items[active].classList.add('active');
        items[other_1].classList.add('other_1');
        items[other_2].classList.add('other_2');

        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            next.click();
        }, 5000);
    }
    let autoPlay = setInterval(() => {
        next.click();
    }, 5000);
    
    return(
        <div className="iphoneC">
            <section className="carousel next">
                <div className="list">
                    <article className="item other_1">
                        <div className="main-content image1" 
                        style="background-color: #9c4d2f;">
                            <div className="content">
                                <h2>Caffe Latte, a new product</h2>
                                <p className="price">$ 20</p>
                                <p className="description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.
                                </p>
                                <button className="addToCard">
                                    Add To Card
                                </button>
                            </div>
                        </div>
                        <figure className="image">
                            <img src="iphone1.png" alt=""/>
                            <figcaption>Caffe Latte, a new product</figcaption>
                        </figure>
                    </article>
                    <article className="item active">
                        <div className="main-content image2">
                            <div className="content">
                                <h2>Strawberry mocha, a new product</h2>
                                <p className="price">$ 20</p>
                                <p className="description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.
                                </p>
                                <button className="addToCard">
                                    Add To Card
                                </button>
                            </div>
                        </div>
                        <figure className="image">
                            <img src="iphone2.png" alt=""/>
                            <figcaption>Strawberry mocha, a new product</figcaption>
                        </figure>
                    </article>
                    <article className="item other_2">
                        <div className="main-content image3">
                            <div className="content">
                                <h2>Doppio espresso, a new product</h2>
                                <p className="price">$ 20</p>
                                <p className="description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.
                                </p>
                                <button className="addToCard">
                                    Add To Card
                                </button>
                            </div>
                        </div>
                        <figure className="image">
                            <img src="iphone3.png" alt=""/>
                            <figcaption>Doppio espresso, a new product</figcaption>
                        </figure>
                    </article>
                    <article className="item">
                        <div className="main-content image4">
                            <div className="content">
                                <h2>Matcha latte macchiato, a new product</h2>
                                <p className="price">$ 20</p>
                                <p className="description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.
                                </p>
                                <button className="addToCard">
                                    Add To Card
                                </button>
                            </div>
                        </div>
                        <figure className="image">
                            <img src="iphone4.png" alt=""/>
                            <figcaption>Matcha latte macchiato, a new product</figcaption>
                        </figure>
                    </article>
                </div>
                <div className="arrows">
                    <button id="prev"></button>
                    <button id="next"></button>
                </div>
            </section>
        </div>
    )
}

export default DropPage