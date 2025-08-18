const TechnologyItem: React.FC<Technology> = ({ icon: Icon, name }) => {
  return (
    <div
      aria-label={name}
      title={name}
      className="group mx-4 flex items-center gap-1.5 text-sm text-subtle transition-all hover:text-secondary-fg sm:mx-6 md:mx-8 md:gap-2 md:text-base dark:hover:text-secondary"
    >
      <Icon
        size={20}
        className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary"
      />
      {name}
    </div>
  );
};

export default TechnologyItem;
