export interface IUserInputPredicate {
    (): boolean;
}

export abstract class SurveyBase {

    public name: string;
    public validation_predicate: IUserInputPredicate;
    public validation_trigger_event_type: string;

    public last_event: Event | null;

    protected _content_element: HTMLElement;
    protected _raw_config: any;

    private _root_element: HTMLElement;
    private _title_element: HTMLElement;
    private _control_bar_element: HTMLElement;
    private _continue_button_element: HTMLElement;

    public get root_element() {
        return this._root_element;
    }

    public get title_element() {
        return this._title_element;
    }

    public get content_element() {
        return this._content_element;
    }

    public get control_bar_element() {
        return this._control_bar_element;
    }

    public get continue_button_element() {
        return this._continue_button_element;
    }

    public abstract get config(): any;

    constructor(name: string, config: any, validation_predicate: IUserInputPredicate = () => true, validation_trigger_event_type: string = `input`) {
        this.name = name;
        this._raw_config = config;
        this.validation_predicate = validation_predicate;
        this.validation_trigger_event_type = validation_trigger_event_type;
        this.last_event = null;

        this._root_element = (() => {
            const temp_container = document.createElement(`div`);
            temp_container.innerHTML =
            `<div class="wb2-survey-element-root">
                <div class="wb2-survey-title"></div>
                <div class="wb2-survey-content"></div>
                <div class="wb2-survey-control-bar">
                    <input class="wb2-survey-continue" type="button">
                </div>
            </div>`;
            return temp_container.firstChild as HTMLElement;
        })();
        this._title_element = this._root_element.querySelector(`.wb2-survey-title`) as HTMLElement;
        this._content_element = this._root_element.querySelector(`.wb2-survey-content`) as HTMLElement;
        this._control_bar_element = this._root_element.querySelector(`.wb2-survey-control-bar`) as HTMLElement;

        this._continue_button_element = this._control_bar_element.querySelector(`.wb2-survey-continue`) as HTMLElement;

        this.root_element.addEventListener(this.validation_trigger_event_type, (e) => {
            this.last_event = e;

        });
    }

    public validInput() {
        return new Promise((res) => {
            this.continue_button_element.addEventListener(`click`, () => {
                if (this.validateInput()) {
                    res(this.last_event as Event);
                }
            });
        });
    }

    private validateInput(override_predicate?: IUserInputPredicate) {
        if (typeof override_predicate !== `undefined`) {
            return override_predicate!();
        } else {
            return this.validation_predicate();
        }
    }
}