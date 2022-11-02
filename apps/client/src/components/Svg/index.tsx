type SvgProps = {
  name: string;
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

function SvgIcon({ name }: { name: string }) {
  if (name === "avatar") {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    );
  }

  if (name === "chevron-left") {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    );
  }

  if (name === "chevron-right") {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    );
  }

  return null;
}

export default function Svg({
  name,
  width = 24,
  height = 24,
  stroke = "currentColor",
  fill = "none",
}: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
      height={height}
      width={width}
    >
      <SvgIcon name={name} />
    </svg>
  );
}
