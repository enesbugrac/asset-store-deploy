import { useFormControlUnstyledContext } from "@mui/base";
import React from "react";

function Helpertext(props: any) {
  const formControlContext = useFormControlUnstyledContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p {...props} className="text-red-500">
      {props.children}
    </p>
  ) : null;
}

export default Helpertext;
