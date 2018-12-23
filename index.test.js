import React from "react";
import { render, fireEvent } from "react-testing-library";
import useInstance from ".";

const Test = props => {
  const [instance, update] = useInstance(props.initialInstanceState);
  const onClick = () => update((instance.test = "updated"));
  return <button onClick={onClick}>{instance.test}</button>;
};

test("instance is initialized with literal value", () => {
  // Given
  const initialInstanceState = {
    test: "Initial instance state"
  };

  // When
  const container = render(
    <Test initialInstanceState={initialInstanceState} />
  );

  // Then
  const button = container.getByText("Initial instance state");
  expect(button).not.toBeUndefined();
});

test("instance is initialized with function that returns a literal value", () => {
  // Given
  const initialInstanceState = {
    test: "Initial instance state"
  };

  // When
  const container = render(
    <Test initialInstanceState={() => initialInstanceState} />
  );

  // Then
  const button = container.getByText("Initial instance state");
  expect(button).not.toBeUndefined();
});

test("component is updated when update is called", () => {
  // Given
  const initialInstanceState = {
    test: "Initial instance state"
  };
  const container = render(
    <Test initialInstanceState={initialInstanceState} />
  );

  // When
  let button = container.getByText("Initial instance state");
  fireEvent.click(button);

  // Then
  button = container.getByText("updated");
  expect(button).not.toBeUndefined();
});
