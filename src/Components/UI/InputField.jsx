import React from "react";
import { Form } from "react-bootstrap";

function InputField(props) {
  return (
    <Form.Group className="mb-3">
     {!props.noM && <Form.Label>{props.label}</Form.Label>}
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}

export default InputField;
