import * as React from "react";

interface SpacerProps {
  space?: number;
}

export const Spacer: React.FunctionComponent<SpacerProps> = ({ space }) => (
  <div
    style={{ marginTop: space ?? 20 / 2, marginBottom: space ?? 20 / 2 }}
  ></div>
);
