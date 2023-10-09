import axios from "axios";
import { useEffect, useState, useRef } from "react";
import loader from "../images/loader.gif";
import { TopBar } from "../components/TopBar";
import { Catalog } from "../components/Catalog";

export const HomePage = () => {
    const API_KEY = "89ba0940d4214c039cf3fea5f299a14c";

    let currentPage = 1;
    let firstLoading = true;
    const [loadedGames, setLoadedGames] = useState([]);
    const [currentGames, setCurrentGames] = useState([]);
    const [sortType, setSortType] = useState('');
    const [sortOrder, setSortOrder] = useState('Asc');
    const filterPlatforms = useRef([]);
    const [refFilterChanged, setRefFilterChanged] = useState(false);
    const searchQuery = useRef('');
    const [refSearchQueryChanged, setRefSearchQueryChanged] = useState(false);

    const loadPage = () => {
        const games = [];
        axios
        .get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}`)
        .then(({ data }) => {
            data.results.forEach((p) => games.push(p));
            setLoadedGames((loadedGames) => [...loadedGames, ...games]);
            if (filterPlatforms.current.length !== 0) {
            setCurrentGames((currentGames) => {
                const allGames = [...loadedGames, ...games];
                const filtered = [];
                allGames.map((game) => {
                game.parent_platforms.every((item) => {
                    if (filterPlatforms.current.indexOf(item.platform.slug) > -1) {
                    filtered.push(game);
                    return false;
                    }
                    return true;
                });
                });
                return filtered;
            });
            } else {
            setCurrentGames((loadedGames) => [...loadedGames, ...games]);
            }
            currentPage++;
        });
    };

    const handleScroll = (e) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight && document.getElementById("top-bar-search")) {
        loadPage();
        document.getElementById("top-bar-search").value = "";
        searchQuery.current = "";
        }
    };

    useEffect(() => {
        if (filterPlatforms.current.length !== 0) {
        const filtered = [];
        loadedGames.map((game) => {
            game.parent_platforms.every((item) => {
            if (filterPlatforms.current.indexOf(item.platform.slug) > -1) {
                filtered.push(game);
                return false;
            }
            return true;
            });
        });
        setCurrentGames(filtered);
        } else {
        setCurrentGames(loadedGames);
        }
    }, [refFilterChanged]);

    useEffect(() => {
        if (searchQuery.current.length !== 0) {
        const filtered = [];
        loadedGames.map((game) => {
            if (game.name.toLowerCase().includes(searchQuery.current.toLocaleLowerCase())) {
            filtered.push(game);
            }
        });
        setCurrentGames(filtered);
        } else {
        setCurrentGames(loadedGames);
        }
    }, [refSearchQueryChanged]);

    const makeSort = () => {
        if (sortType === "Rating") {
        const sortedGames = [...currentGames].sort((a, b) => {
            if (sortOrder === "Asc") {
                return a.rating - b.rating;
            } else {
                return b.rating - a.rating;
            }
        });
        setCurrentGames(sortedGames);
        }
        if (sortType === "Release date") {
        const sortedGames = [...currentGames].sort((a, b) => {
            if (sortOrder === "Asc") {
            return new Date(a.released) - new Date(b.released);
            } else {
            return new Date(b.released) - new Date(a.released);
            }
        });
        setCurrentGames(sortedGames);
        }
        if (sortType === "None") {
        setCurrentGames(loadedGames);
        }
    }

    useEffect(() => {
        makeSort();
    }, [sortType]);

    useEffect(() => {
        makeSort();
    }, [sortOrder]);

    useEffect(() => {
        if (firstLoading) {
        firstLoading = false;
        //console.log(loadedGames.length)
        loadPage();
        window.addEventListener("scroll", handleScroll);
        }
    }, []);
    return (
        <>
        {loadedGames.length
            ?
            <>
              <TopBar
                filterPlatforms={filterPlatforms}
                setRefFilterChanged={setRefFilterChanged}
                searchQuery={searchQuery}
                setRefSearchQueryChanged={setRefSearchQueryChanged}
                setSortType={setSortType}
                setSortOrder={setSortOrder}
              />
              <Catalog games={currentGames} />
            </>
            : <img className="loader" alt="" src={loader} />}
        </>
    );
}