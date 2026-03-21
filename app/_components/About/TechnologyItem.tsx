const TechnologyItem: React.FC<DataTechnology> = ({ icon: Icon, name }) => {
  return (
    <div
      aria-label={name}
      title={name}
      className="group text-subtle hover:text-secondary-fg dark:hover:text-secondary mx-4 flex items-center gap-1.5 text-sm transition-all sm:mx-6 md:mx-8 md:gap-2 md:text-base"
    >
      <Icon
        size={20}
        className="text-subtle group-hover:text-secondary-fg dark:group-hover:text-secondary transition-all"
      />
      {name}
    </div>
  );
};

export default TechnologyItem;
