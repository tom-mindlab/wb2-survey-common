function validLength(user_input: string, conditions: any): boolean {
    if (user_input.length > conditions.max_length || user_input.length < conditions.min_length) {
        return false;
    } else {
        return true;
    }
}

function validCharSets(user_input: string, conditions: any): boolean {
    const regex_premade_filters = new Map(Object.entries({
        alphabetic: () => {
            return /[^\s\d\W]/gimu;
        },
        non_alphabetic: () => {
            return /[\s\d\W]/gimu;
        },
        numeric: () => {
            return /\d/gimu;
        },
        non_numeric: () => {
            return /[^\d]/gimu;
        },
        whitespace: () => {
            return /\s/gimu;
        },
        non_whitespace: () => {
            return /[^\s]/gimu;
        },
        hor_whitespace: () => {
            return /[ \t]/gimu;
        },
        non_hor_whitespace: () => {
            return /[^ \t]/gmiu;
        },
        ver_whitespace: () => {
            return /[\r\n|\r|\n]/gimu;
        },
        non_ver_whitespace: () => {
            return /[^\r\n|\r|\n]/gmiu;
        }
    }));
    for (const reg_key of Object.keys(conditions.disallowed_content).filter((key) => conditions.disallowed_content[key] === true)) {
        const reg_func = regex_premade_filters.get(reg_key as string);
        if (reg_func) {
            if (user_input.search(reg_func()) !== -1) {
                return false;
            }
        }
    }
    return true;
}