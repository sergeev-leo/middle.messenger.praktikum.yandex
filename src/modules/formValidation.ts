export const VALIDATION_PATTERNS = {
  REQUIRED: '(\\S){1,}',
  EMAIL: '[a-z\\d\\-]+@[a-z]+\\.[a-z]+',
  LOGIN: '(?=.*[a-zA-Z\\-_])[a-zA-Z\\-_\\d]{3,20}',
  FIRST_NAME: '[A-ZА-Я][A-ZА-Яа-яa-z\\-]+',
  SECOND_NAME: '[A-ZА-Я][A-ZА-Яа-яa-z\\-]+',
  PHONE: '(\\+?\\d+){10,15}',
  PASSWORD: '(?=.*[A-ZА-Я])(?=.*[0-9]).{8,40}',
};

export const createSubmitFn = (formElementSelector: string) =>
  (e: Event) => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector(formElementSelector);

    if(!form) {
      return;
    }

    const formData = new FormData(form);

    const formDataObject: Record<string, FormDataEntryValue> = {};
    for(const [name, value] of formData) {
      formDataObject[name] = value;
    }

    // eslint-disable-next-line no-console
    console.log(formDataObject);
  };
