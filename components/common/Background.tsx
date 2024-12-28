export default function Background() {
  return (
    <>
      <div className="main-gradient absolute left-0 top-0 h-full w-full" />
      <div className="page-bg-grid absolute left-0 top-0 h-full w-full opacity-40 dark:opacity-10" />
      <div className="absolute left-0 top-0 h-svh w-screen bg-gradient-to-b from-background via-background via-10% to-transparent" />
    </>
  );
}
