/**
 * notFound
 * @method notFound
 * @return FunctionExpression
 */
function notFound() {
    return function* notFound(next) {
        yield next;

        if(this.response.status === 404 && !this.response.body) {
            this.throw(404);
        }
    };
}

module.exports = notFound;
