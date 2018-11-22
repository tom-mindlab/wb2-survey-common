export interface IUserInputPredicate {
    (user_input: any): boolean;
}
export declare abstract class SurveyBase {
    name: string;
    validation_predicate: IUserInputPredicate;
    validation_trigger_event_type: string;
    last_event: Event | null;
    protected _content_element: HTMLElement;
    protected _raw_config: any;
    private _root_element;
    private _title_element;
    private _control_bar_element;
    private _continue_button_element;
    readonly root_element: HTMLElement;
    readonly title_element: HTMLElement;
    readonly content_element: HTMLElement;
    readonly control_bar_element: HTMLElement;
    readonly continue_button_element: HTMLElement;
    abstract readonly config: any;
    abstract readonly value: any;
    constructor(name: string, config: any, validation_predicate?: IUserInputPredicate, validation_trigger_event_type?: string);
    validInput(): Promise<{}>;
    private validateInput;
}
//# sourceMappingURL=survey-common.d.ts.map