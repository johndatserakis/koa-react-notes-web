import React from "react";
import { Form, Input } from "antd";

// interface LoginFormProperties {
//   email: string;
//   password: string;
// }

interface TextInputProps {
  values: any;
  errors: any;
  handleSubmit: any;
  // setFieldValue: any;
  // setFieldTouched: any;
  name: string;
}

export const TextInput = (props: TextInputProps) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { name } = props.values;

  return (
    <Form.Item>
      {/* // hasFeedback={!!props.errors[name]}
      // validateStatus={props.errors[name] && “error”}
      // validateStatus={props.errors[name]}
      // help={props.errors[name]}
    // > */}
      <Input
        // placeholder=”Basic usage”
        value={name}
        // onChange={(event) => setFieldValue(props.name, event.target.value)}
        // onBlur={() => props.setFieldTouched(props.name)}
        // onPressEnter={props.handleSubmit}
      />
    </Form.Item>
  );
};


// export const TextInput = ({
//   values,
//   errors,
//   handleSubmit,
//   setFieldValue,
//   setFieldTouched,
//   name
// }) => (
//   <Form.Item
//     hasFeedback={!!errors[name]}
//     validateStatus={errors[name] && “error”}
//     help={errors[name]}
//   >
//     <Input
//       placeholder=”Basic usage”
//       value={values[name]}
//       onChange={event => setFieldValue(name, event.target.value)}
//       onBlur={() => setFieldTouched(name)}
//       onPressEnter={handleSubmit}
//     />
//   </Form.Item>
// );
// export default TextInput;
