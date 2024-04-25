/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aEXFg8KbXOv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function EditChecklist() {
  return (
    <div className="max-w-sm xl:w-screen">
      <div className="font-semibold text-xs px-1 text-neutral-400 mb-4 flex items-center">
        {/* <MenuIcon className="mr-3 h-5 w-5" /> */}
        <div className="">CV Sections</div>
      </div>
      <nav className="flex flex-col">
        <a
          className="p-3 px-4 border-b py-4 border-neutral-200 hover:bg-neutral-100 transition-colors flex items-center bg-white"
          href="#"
        >
          <UserIcon className="mr-3 h-5 w-5" />
          About
        </a>
        <a
          className="p-3 px-4 border-b py-4 border-neutral-200 hover:bg-neutral-100 transition-colors flex items-center bg-white"
          href="#"
        >
          <BriefcaseIcon className="mr-3 h-5 w-5" />
          Experience
        </a>
        <a
          className="p-3 px-4 border-b py-4 border-neutral-200 hover:bg-neutral-100 transition-colors flex items-center bg-white"
          href="#"
        >
          <BookIcon className="mr-3 h-5 w-5" />
          Education
        </a>
        <a
          className="p-3 px-4 border-b py-4 border-neutral-200 hover:bg-neutral-100 transition-colors flex items-center bg-white"
          href="#"
        >
          <ActivityIcon className="mr-3 h-5 w-5" />
          Skills
        </a>
      </nav>
    </div>
  );
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
