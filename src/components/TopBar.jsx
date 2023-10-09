const PLATFORMS = [
    {
        name: "PC",
        slug: "pc",
    },
    {
        name: "PlayStation",
        slug: "playstation",
    },
    {
        name: "Apple Macintosh",
        slug: "mac",
    },
    {
        name: "Xbox",
        slug: "xbox",
    },
    {
        name: "Nintendo",
        slug: "nintendo",
    },
    {
        name: "GameCube",
        slug: "gamecube",
    },
    {
        name: "Android",
        slug: "android",
    },
    {
        name: "iOS",
        slug: "ios",
    },
];

export const TopBar = ({
    filterPlatforms,
    setRefFilterChanged,
    searchQuery,
    setRefSearchQueryChanged,
    setSortType,
    setSortOrder,
}) => {
    const handleFilter = (e) => {
        setRefFilterChanged(prev => !prev);
        if (!filterPlatforms.current.includes(e.target.getAttribute('data-slug'))) {
            filterPlatforms.current = [...filterPlatforms.current, e.target.getAttribute('data-slug')];
            e.target.classList.add('selected');
        } else {
            const index = filterPlatforms.current.indexOf(e.target.getAttribute('data-slug'));
            if (index > -1) {
                const editedPlatforms = [...filterPlatforms.current];
                editedPlatforms.splice(index, 1)
                filterPlatforms.current = editedPlatforms;
                e.target.classList.remove('selected');
            }
        }
    }
    const handleSearch = (e) => {
        setRefSearchQueryChanged(prev => !prev);
        searchQuery.current = e.target.value;
    }
    const handleSort = (e) => {
        setSortType(e.target.value);
    }
    const handleSortOrder = (e) => {
        setSortOrder(e.target.value);
    }

    return (
        <div className="top-bar">
            <div className="top-bar__block">
                <div className="top-bar__group">
                    <div className="top-bar__label">
                        Sort By
                    </div>
                    <select onChange={handleSort}>
                        <option>None</option>
                        <option>Rating</option>
                        <option>Release date</option>
                    </select>
                </div>
                <div className="top-bar__group">
                    <div className="top-bar__label">
                        Order
                    </div>
                    <select onChange={handleSortOrder}>
                        <option>Asc</option>
                        <option>Desc</option>
                    </select>
                </div>
                <div className="top-bar__group">
                    <div className="top-bar__label">
                        Search
                    </div>
                    <div className="top-bar__platforms">
                        <input id="top-bar-search" placeholder="Game title" type="text" onChange={handleSearch} />
                    </div>
                </div>
            </div>
            <div className="top-bar__block">
                <div className="top-bar__group">
                    <div className="top-bar__label">
                        Platforms
                    </div>
                    <div className="top-bar__platforms">
                        {PLATFORMS.map((platform) => {
                            return  (
                                <div
                                    className="top-bar__platform"
                                    data-slug={platform.slug}
                                    key={platform.slug}
                                    onClick={handleFilter}
                                >
                                    {platform.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}