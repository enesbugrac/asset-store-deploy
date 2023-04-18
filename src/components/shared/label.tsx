import { useFormControlUnstyledContext } from "@mui/base";
import React, { useEffect, useState } from "react";

function Label({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const formControlContext = useFormControlUnstyledContext();
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p
      className={`${className} ${
        error || showRequiredError ? "text-red-500" : ""
      }`}
    >
      {children}
      {required ? " *" : ""}
    </p>
  );
}

export default Label;
