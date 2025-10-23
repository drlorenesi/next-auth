export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <rect x="6" y="11" width="2.5" height="7" rx="1.2" />
      <rect x="11" y="3" width="2.5" height="15" rx="1.2" />
      <rect x="16" y="8" width="2.5" height="10" rx="1.2" />
    </svg>
  );
}
