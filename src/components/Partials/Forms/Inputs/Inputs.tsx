import React, { FunctionComponent, useState } from "react";
import { useField } from "formik";
import { v4 as uuidv4 } from "uuid";

interface SubmitButtonProps {
  name: string;
  text: string;
  loading: boolean;
  loadingText: string;
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

interface CustomInputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
}

type CustomTextAreaProps = Omit<CustomInputProps, "type">;

export const TextInput: FunctionComponent<CustomInputProps> = (
  props: CustomInputProps,
) => {
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

export const TextArea: FunctionComponent<CustomTextAreaProps> = (
  props: CustomTextAreaProps,
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
            htmlFor="contactFormData-name"
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

// const MyCheckbox = ({ children, ...props }) => {
//   // We need to tell useField what type of input this is
//   // since React treats radios and checkboxes differently
//   // than inputs/select/textarea.
//   const [field, meta] = useField({ ...props, type: "checkbox" });
//   return (
//     <>
//       <label className="checkbox">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// // Styled components ....
// const StyledSelect = styled.select`
//   /** ... * /
// `;

// const StyledErrorMessage = styled.div`
//   /** ... * /
// `;

// const StyledLabel = styled.label`
//  /** ...* /
// `;

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
//       <StyledSelect {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <StyledErrorMessage>{meta.error}</StyledErrorMessage>
//       ) : null}
//     </>
//   );
// };

// { /* <MyTextInput
//   label="Last Name"
//   name="lastName"
//   type="text"
//   placeholder="Doe"
// />
// <MyTextInput
//   label="Email Address"
//   name="email"
//   type="email"
//   placeholder="jane@formik.com"
// />
// <MySelect label="Job Type" name="jobType">
//   <option value="">Select a job type</option>
//   <option value="designer">Designer</option>
//   <option value="development">Developer</option>
//   <option value="product">Product Manager</option>
//   <option value="other">Other</option>
// </MySelect>
// <MyCheckbox name="acceptedTerms">
//   I accept the terms and conditions
// </MyCheckbox> */ }
