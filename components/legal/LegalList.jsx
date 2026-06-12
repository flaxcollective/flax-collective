const LegalList = ({ items }) => {
  return (
    <ul className="space-y-5 text-text-body">
      {items.map((item, index) => (
        <li className="text-xs leading-6 md:text-base md:leading-7" key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default LegalList;