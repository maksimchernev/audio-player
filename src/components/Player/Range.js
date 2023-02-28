export const Range = ({
  classNames,
  max,
  step,
  value,
  handler,
}) => {
  const maxValue = max === Infinity ? '1' : max
  const currentValue = max === Infinity ? '1' : value
  const handleInputShift = (e) => {
    handler(e);
  };

  return (
    <input
      className={classNames}
      type="range"
      min='0'
      max={maxValue}
      step={step}
      value={currentValue}
      onInput={handleInputShift}
      style={{backgroundSize: `${currentValue/maxValue*100}% 100%`}}
    />
  );
};
