import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import loader from "../images/loader.gif";
import arrow_left from "../images/arrow-left.svg";
import { Carousel } from '@trendyol-js/react-carousel';

export const ProductPage = () => {
    const API_KEY = "89ba0940d4214c039cf3fea5f299a14c";
    const { slug } = useParams();
    const [data, setData] = useState();
    const [screenshots, setScreenshots] = useState();
    console.log(slug);
    const loadGame = () => {
        const games = [];
        axios
        .get(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
        .then(({ data }) => {
            setData(data);
        });
        axios
        .get(`https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`)
        .then(({ data }) => {
            setScreenshots(data);
        });
    };
    useEffect(() => {
        loadGame();
    }, []);
    useEffect(() => {
        console.log(screenshots);
    }, screenshots);
    return (
        <>
            {data ?
                <div className="game-page">
                    <Link to="/" className="game-page__back">
                        <img alt="" src={arrow_left} />
                        <span>Back</span>
                    </Link>
                    <div className="game-page__title">{data.name}</div>
                    <img
                        className="game-page__image"
                        alt=""
                        src={data.background_image}
                    />
                    <div className="game-page__rating">rating: {data.rating}</div>
                    <div className="game-page__release-date">released: {data.released}</div>
                    <div
                        className="game-page__description"
                        dangerouslySetInnerHTML={{__html: data.description}}
                    ></div>
                    <div className="game-page__screenshots">
                        {screenshots.results.length > 0 &&
                            <Carousel>
                                {screenshots.results.map(
                                        (screenshot, index) => 
                                        <div data-index={index} key={index}>
                                            <img className="game-page__screenshot" alt="" src={screenshot.image} />
                                        </div>
                                    )
                                }
                            </Carousel>
                        }
                    </div>
                </div>
                : <img className="loader" alt="" src={loader} />}
        </>
    );
}