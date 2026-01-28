export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center overflow-x-auto bg-[#0a0a0a] bg-[url('../images/auth-bg.jpg')] bg-cover bg-center p-4">
      {/* This div creates the subtle dark overlay on the pattern */}
      <div className="absolute inset-0 backdrop-blur-[0px]"></div>
      {/* The content (login/register card) will sit on top */}
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
