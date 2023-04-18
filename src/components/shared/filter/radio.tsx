type RadioProps = {
  label: string;
} & JSX.IntrinsicElements["input"];

export function Radio(props: RadioProps) {
  return (
    <span className={`${props.className}`}>
      <input
        checked={props.checked}
        type="radio"
        id={`placement-${props.value}-radio`}
        name="placement"
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={`placement-${props.value}-radio`}>{props.label}</label>
    </span>
  );
}
