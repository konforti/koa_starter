const set = require('lodash/set');

/**
 * Description
 * @method rename
 * @param {} opt
 * @return ArrowFunctionExpression
 */
function rename(opt) {
    /**
     * Description
     * @method renameId
     * @param {} doc
     * @param {} ret
     * @return 
     */
    function renameId(doc, ret) {
        ret[opt.name] = ret._id;
        delete ret._id;
    }

    return (schema) => {
        set(schema, 'options.toObject.transform', renameId);
        set(schema, 'options.toJSON.transform', renameId);
    };
}

module.exports = rename;
