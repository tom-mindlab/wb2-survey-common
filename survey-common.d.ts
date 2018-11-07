export interface IUserInputPredicate {
    (user_input: any): boolean;
}
export declare class SurveyBase {
    name: string;
    validation_predicate: IUserInputPredicate;
    validation_trigger_event_type: string;
    last_event: Event | null;
    protected _content_element: HTMLElement;
    private _root_element;
    private _title_element;
    private _control_bar_element;
    private _continue_button_element;
    readonly root_element: HTMLElement;
    readonly title_element: HTMLElement;
    readonly content_element: HTMLElement;
    readonly control_bar_element: HTMLElement;
    readonly continue_button_element: HTMLElement;
    constructor(name: string, validation_predicate: IUserInputPredicate, validation_trigger_event_type?: string);
    validateInput(user_input: any, override_predicate?: IUserInputPredicate): boolean;
}
//# sourceMappingURL=survey-common.d.ts.map