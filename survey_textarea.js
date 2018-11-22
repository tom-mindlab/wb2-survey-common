import { SurveyBase } from "./survey_base";
import * as SurveyUtils from "./survey_utils";
export class SurveyTextArea extends SurveyBase {
    get textarea_element() {
        return this._textarea_element;
    }
    get config() {
        return this._raw_config;
    }
    get value() {
        return this._textarea_element.value;
    }
    constructor(name, config, override_predicate, validation_trigger_event_type = `input`) {
        super(name, config, (() => {
            if (override_predicate) {
                return override_predicate;
            }
            else {
                return (user_input) => {
                    if (SurveyUtils.validLength(user_input, this.config.conditions)
                        && SurveyUtils.validCharSets(user_input, this.config.conditions)
                        && user_input.search(new RegExp((this.config).conditions.disallowed_content.custom)) !== -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
            }
        })(), validation_trigger_event_type);
        this._textarea_element = document.createElement(`textarea`);
        this._content_element.appendChild(this._textarea_element);
    }
}
//# sourceMappingURL=survey_textarea.js.map