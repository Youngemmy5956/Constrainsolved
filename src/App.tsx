import React, { ReactElement, ReactNode } from "react";

type ValidChild = ReactElement<{ customProp: string }>;

type ParentProps = {
  children: ValidChild | ValidChild[];
};

const Parent: React.FC<ParentProps> = ({ children }) => {
  if (!Array.isArray(children)) {
    children = [children];
  }

  const invalidChildren = children.filter(
    (child) => child.type !== ChildComponent
  );

  if (invalidChildren.length > 0) {
    throw new Error("Invalid child components in Parent");
  }

  return <div>{children}</div>;
};

type ChildProps = {
  customProp: string;
};

const ChildComponent: React.FC<ChildProps> = ({ customProp }) => {
  return <div>{customProp}</div>;
};

export default function App() {
  return (
    <Parent>
      <ChildComponent customProp="Hello" />
      {/* <p>Parent should complain</p> */}
    </Parent>
  );
}