window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };
window.domNode = document.createElement('div');
document.body.appendChild(window.domNode);
module.exports = window.matchMedia;
