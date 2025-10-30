declare module "react-quill" {
  import * as React from "react";

  interface QuillProps {
    // Define the props for the Quill component
    // For example:
    theme?: string;
    value?: string;
    onChange?: (value: string) => void;
    // ...
  }

  interface QuillState {
    // Define the state for the Quill component
    // For example:
    value: string;
    // ...
  }

  class Quill extends React.Component<QuillProps, QuillState> {
    // Define the methods and properties of the Quill component
    // For example:
    render(): JSX.Element;
    // ...
  }

  export default Quill;
}
