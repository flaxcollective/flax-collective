const LegalSection = ({ title, children }) => {
  return (
    <div className="space-y-2.5 md:space-y-5">
      <h2 className="text-lg leading-6.5 md:text-3xl md:leading-normal font-medium text-navy">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default LegalSection;