interface DetailsProps {
  left: string;
  right: string;
}
export default function Details({ left, right }: DetailsProps) {
  return (
    <h1 className="text-justify font-semibold break-words">
      {left}: <span className="text-zinc-500">{right}</span>
    </h1>
  );
}
