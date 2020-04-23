import React, { FunctionComponent, useState } from "react";
import { useField } from "formik";
import { v4 as uuidv4 } from "uuid";

interface SubmitButtonProps {
  name: string;
  text: string;
  loading: boolean;
  loadingText: string;
}

interface InputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

type TextAreaProps = Omit<InputProps, "type">;

interface CheckboxProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
}

interface RadioOption {
  value: string | number;
  label: string;
}

interface RadioProps {
  name: string;
  label?: string;
  options: RadioOption[];
  disabled?: boolean;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const [id] = useState(() => uuidv4());

  return (
    <button
      id={`${props.name}-${id}`}
      type="submit"
      className="btn btn-green btn-block"
      disabled={props.loading}
    >
      {props.loading ? (
        <span>{props.loadingText}</span>
      ) : (
        <span>{props.text}</span>
      )}
    </button>
  );
};

export const TextInput: FunctionComponent<InputProps> = (props: InputProps) => {
  const [field, { error, touched }] = useField({
    name: props.name,
    type: props.type,
  });

  const [id] = useState(() => uuidv4());

  return (
    <div className="input-wrapper">
      {props.label !== undefined && (
        <label htmlFor={`${props.name}-${id}`} className="input-wrapper__label">
          {props.label}
        </label>
      )}
      <input
        type="text"
        className="form-control"
        id={`${props.name}-${id}`}
        name={`${props.name}-${id}`}
        {...field}
        {...props}
      />
      {touched && error ? (
        <div className="input-wrapper__error-message">{error}</div>
      ) : null}
    </div>
  );
};

export const TextArea: FunctionComponent<TextAreaProps> = (
  props: TextAreaProps,
) => {
  const [field, { error, touched }] = useField({
    name: props.name,
  });

  const [id] = useState(() => uuidv4());

  return (
    <>
      <div className="input-wrapper">
        {props.label !== undefined && (
          <label
            htmlFor={`${props.name}-${id}`}
            className="input-wrapper__label"
          >
            {props.label}
          </label>
        )}
        <textarea
          className="form-control"
          id={`${props.name}-${id}`}
          name={`${props.name}-${id}`}
          {...field}
          {...props}
        />
        {touched && error ? (
          <div className="input-wrapper__error-message">{error}</div>
        ) : null}
      </div>
    </>
  );
};

export const Checkbox: FunctionComponent<CheckboxProps> = (
  props: CheckboxProps,
) => {
  const [field, { error, touched }] = useField({
    name: props.name,
  });

  const [id] = useState(() => uuidv4());

  return (
    <div className="input-wrapper">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={`${props.name}-${id}`}
          checked={field.value}
          {...field}
          {...props}
        />
        <label className="form-check-label" htmlFor={`${props.name}-${id}`}>
          {props.label}
        </label>
      </div>

      {touched && error ? (
        <div className="input-wrapper__error-message">{error}</div>
      ) : null}
    </div>
  );
};

export const Select: FunctionComponent<SelectProps> = (props: SelectProps) => {
  const [field, { error, touched }] = useField({
    name: props.name,
  });

  const [id] = useState(() => uuidv4());

  return (
    <div className="input-wrapper">
      {props.label !== undefined && (
        <label htmlFor={`${props.name}-${id}`} className="input-wrapper__label">
          {props.label}
        </label>
      )}
      <select
        className="form-control"
        id={`${props.name}-${id}`}
        name={`${props.name}-${id}`}
        {...field}
        {...props}
      >
        {props.options.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
      {touched && error ? (
        <div className="input-wrapper__error-message">{error}</div>
      ) : null}
    </div>
  );
};

export const Radio: FunctionComponent<RadioProps> = (props: RadioProps) => {
  const [field, { error, touched }] = useField({
    name: props.name,
  });

  const [id] = useState(() => uuidv4());

  // https://github.com/jaredpalmer/formik/issues/1243
  const createEvent = (value: string) => {
    return {
      persist: () => {},
      target: {
        type: "change",
        name: props.name,
        value,
      },
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(createEvent(e.target.value));
  };

  return (
    <div className="input-wrapper">
      {props.label !== undefined && (
        <label htmlFor={`${props.name}-${id}`} className="input-wrapper__label">
          {props.label}
        </label>
      )}
      {props.options.map((o) => {
        return (
          <div key={o.value} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id={`${o.label.replace(" ", "-")}-${id}`}
              name={`${props.name}-${id}`}
              defaultChecked={field.value === o.label}
              value={o.value}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`${o.label}-${id}`}>
              {o.label}
            </label>
          </div>
        );
      })}
      {touched && error ? (
        <div className="input-wrapper__error-message">{error}</div>
      ) : null}
    </div>
  );
};
