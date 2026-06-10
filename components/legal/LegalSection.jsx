const LegalSection = ({ title, children }) => {
  return (
    <div className="space-y-1.5 md:space-y-2">
      <h2 className="text-2xl md:text-3xl font-medium text-navy">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default LegalSection;