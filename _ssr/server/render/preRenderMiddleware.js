export const preRenderMiddleware = (dispatch, branch, req, res) =>
    Promise.all(branch
        .reduce(
            (previous, current) =>
                (current.route.need || []).concat(previous.route),
            []
        )
        .map(need => {
            if (need) {
                return dispatch(need(branch[0].match.params, req.url, req.headers, res));
            }
            return false;
        }));
