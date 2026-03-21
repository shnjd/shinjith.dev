export default function Background() {
  return (
    <>
      <div className="main-gradient absolute top-0 left-0 h-full w-full" />
      <div className="page-bg-grid absolute top-0 left-0 h-full w-full opacity-40 dark:opacity-10" />
      <div className="from-background via-background absolute top-0 left-0 h-dvh w-screen bg-linear-to-b via-10% to-transparent" />
    </>
  );
}
