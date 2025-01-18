import './styles/main.css';

function Menu() {
    const currentDomain = window.location.hostname; // Get dynamic domain or IP

    return (
        <div className="menu">
            {/* Buttons Section */}
            <div className="buttons-flex">
                <div className="button bg-red" title="Close"></div>
                <div className="button bg-yellow" title="Minimize"></div>
                <div className="button bg-green" title="Maximize"></div>
            </div>

            {/* Title Section */}
            <div className="title">
                <h1>
                    <span className="site-name">
                        <i
                            className="fa-solid fa-xl fa-biohazard folder-icon"
                            aria-hidden="true"
                            title="Root"
                        ></i>
                        &nbsp;root@{currentDomain}
                    </span>
                    <span className="current-time">
                        <div>
                        </div>
                    </span>
                </h1>
            </div>

            {/* Additional Buttons */}
            <div className="buttons-flex2">
                <i
                    className="fa-solid fa-compact-disc"
                    aria-hidden="true"
                    title="Settings"
                ></i>
            </div>
        </div>
    );
}

export default Menu;
