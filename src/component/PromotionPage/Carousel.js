import React from 'react';
import { useState, useEffect } from 'react'
import './Carousel.css';

function Carousel() {


    const [currentIndex, setIndex] = useState(1);
    let temp = currentIndex;
    useEffect(() => console.log("test"), [temp])
    //setInterval(() => { temp += 1; console.log(temp) }, 1000);





    return (

        <>
            <div className="carousel">
                <div
                    className="carouselBtn leftCarouselBtn"
                    onClick={() => setIndex(prev => prev === 1 ? prev = 3 : prev = prev - 1)}></div>
                <div className="carouselFrame">
                    <div className="carouselList" style={{ transform: `translateX(-${(temp - 1) * 500}px)` }}>

                        <div className="carouselItem1">1,{currentIndex}</div>
                        <div className="carouselItem2">2,{currentIndex}</div>
                        <div className="carouselItem3">3,{currentIndex}</div>


                    </div>
                </div>
                <div
                    className={`carouselBtn rightCarouselBtn`}
                    onClick={() => setIndex(prev => prev === 3 ? prev = 1 : prev + 1)}></div>
                <div className="carouselDot"
                    onClick={() => setIndex(1)}
                    style={{ backgroundColor: `${currentIndex === 1 ? "black" : "slategray"}` }}></div>
                <div className="carouselDot"
                    onClick={() => setIndex(2)}
                    style={{ backgroundColor: `${currentIndex === 2 ? "black" : "slategray"}` }}></div>
                <div className="carouselDot"
                    onClick={() => setIndex(3)}
                    style={{ backgroundColor: `${currentIndex === 3 ? "black" : "slategray"}` }}></div>
            </div>


        </>
    )

}

export default Carousel;