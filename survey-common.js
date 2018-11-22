export class SurveyBase {
    get root_element() {
        return this._root_element;
    }
    get title_element() {
        return this._title_element;
    }
    get content_element() {
        return this._content_element;
    }
    get control_bar_element() {
        return this._control_bar_element;
    }
    get continue_button_element() {
        return this._continue_button_element;
    }
    constructor(name, config, validation_predicate = () => true, validation_trigger_event_type = `input`) {
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
            return temp_container.firstChild;
        })();
        this._title_element = this._root_element.querySelector(`.wb2-survey-title`);
        this._content_element = this._root_element.querySelector(`.wb2-survey-content`);
        this._control_bar_element = this._root_element.querySelector(`.wb2-survey-control-bar`);
        this._continue_button_element = this._control_bar_element.querySelector(`.wb2-survey-continue`);
        this.root_element.addEventListener(this.validation_trigger_event_type, (e) => {
            this.last_event = e;
        });
    }
    validInput(user_input) {
        return new Promise((res) => {
            this.continue_button_element.addEventListener(`click`, () => {
                if (this.validateInput(user_input)) {
                    res(this.last_event);
                }
            });
        });
    }
    validateInput(user_input, override_predicate) {
        if (typeof override_predicate !== `undefined`) {
            return override_predicate(user_input);
        }
        else {
            return this.validation_predicate(user_input);
        }
    }
}
//# sourceMappingURL=survey-common.js.map