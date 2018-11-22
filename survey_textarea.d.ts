import { IUserInputPredicate, SurveyBase } from "./survey_base";
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
export declare class SurveyTextArea extends SurveyBase {
    private _textarea_element;
    readonly textarea_element: HTMLTextAreaElement;
    readonly config: ISurveyTextAreaConfig;
    readonly value: string;
    constructor(name: string, config: ISurveyTextAreaConfig, override_predicate?: IUserInputPredicate, validation_trigger_event_type?: string);
}
export {};
//# sourceMappingURL=survey_textarea.d.ts.map