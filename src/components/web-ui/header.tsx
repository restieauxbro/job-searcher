type Props = {};
export default function Header({}: Props) {
  return (
    <div className=" top-0 left-0 w-full z-10 px-4 py-2 border-b">
      <img
        src="/images/mission-ready-logo.svg"
        alt="logo"
        className="h-8 w-auto md:pl-4"
      />
    </div>
  );
}
