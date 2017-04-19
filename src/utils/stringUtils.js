export default {
    REGEX: {
        WHITESPACE: '\s',
        TRAILING: '$',
        LEADING: '^',
        format(expression) {
            return expression.includes(' ') ? expression.split(' ').join(this.WHITESPACE) : expression
        }
    },
    formatPattern(expression) {
        return '[' + this.REGEX.format(expression) + ']+';
    },
    trim(character, value) {
        return this.trimTrailing(character, this.trimLeading(character, value));
    },
    trimLeading(character, value, ignoreCase = true) {
        if([character, value].every(param => this.hasLength(param))){
            const expression = this.REGEX.LEADING + this.formatPattern(character);
            const regex = this.getRegExp(expression, ignoreCase);
            const replacement = value.replace(regex, '');
            console.log("EXPRESSION", expression);
            console.log("REGEX", regex);
            console.log("REPLACEMENT", replacement);
            return replacement;
        }
    },
    trimTrailing(character, value, ignoreCase = true) {
        if([character, value].every(param => this.hasLength(param))){
            const expression = this.formatPattern(character) + this.REGEX.TRAILING;
            return value.replace(this.getRegExp(expression, ignoreCase), '');
        }
    },
    getRegExp(expression, ignoreCase = true) {
        return this.hasLength(expression) ?
            new RegExp(expression, ignoreCase === true ? 'gi' : 'g') : null;
    },
    hasLength(value) {
        return typeof value === 'string' && value.length >= 1;
    }
};
