import { IUserInputPredicate, SurveyBase } from "./survey_base";

import * as SurveyUtils from "../utils/survey_utils";

interface IDisallowedContentConfig {
    whitespace: boolean;
    alphabetic: boolean;
    numeric: boolean;
    horizontal_whitespace: boolean;
    vertical_whitespace: boolean;
    custom: string;
}

interface IConditionsConfig {
    disallowed_content: IDisallowedContentConfig;
    min_length: number;
    max_length: number;
    enforcement: string;
}

export interface ISurveyTextAreaConfig {
    language: string;
    label: string;
    conditions: IConditionsConfig;
}

export class SurveyTextArea extends SurveyBase {
    private _textarea_element: HTMLTextAreaElement;

    get textarea_element() {
        return this._textarea_element;
    }

    get config() {
        return this._raw_config as ISurveyTextAreaConfig;
    }

    get value() {
        return this.textarea_element.value;
    }

    constructor(name: string, config: ISurveyTextAreaConfig, override_predicate?: IUserInputPredicate, validation_trigger_event_type: string = `input`) {
        super(name, config, (() => {
            if (override_predicate) {
                return override_predicate;
            } else {
                return (user_input: any) => {
                    if (SurveyUtils.validLength(user_input, this.config.conditions)
                    && SurveyUtils.validCharSets(user_input, this.config.conditions)
                    && user_input.search(new RegExp((this.config).conditions.disallowed_content.custom)) !== -1) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        })(), validation_trigger_event_type);
        this._textarea_element = document.createElement(`textarea`);
        this._content_element.appendChild(this._textarea_element);
    }
}