import { Link } from "react-router-dom";

export const Catalog = ({games}) => {
    //console.log(games);
    return (
        <div className="wrap">
            {games.map((game) => {
                return (
                    <Link
                        to={`game/${game.slug}`}
                        key={game.id}
                    >
                        <div
                            className="game"
                        >
                            <div className="game__image-wrap">
                            <img
                                className="game__image"
                                alt=""
                                src={game.background_image}
                            />
                            </div>
                            <div className="game__title">{game.name}</div>
                            <div className="game__rating">rating: {game.rating}</div>
                            <div className="game__release-date">released: {game.released}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}