import classNames from 'classnames';

interface SegmentedControlProps {
  data: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

function SegmentedControl({
  data,
  value = data[0].value,
  onChange,
}: SegmentedControlProps) {
  function handleChange(value: string) {
    onChange && onChange(value);
  }

  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 p-0.5">
      {data.map((item) => (
        <button
          key={item.value}
          type="button"
          disabled={item.value === value}
          onClick={() => handleChange(item.value)}
          className="flex items-center rounded-md py-1 px-2 text-sm font-semibold disabled:bg-white disabled:shadow">
          <span
            className={classNames(
              item.value === value ? 'text-gray-600' : 'text-gray-400'
            )}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;
