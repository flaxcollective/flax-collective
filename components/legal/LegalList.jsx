const LegalList = ({ items }) => {
  return (
    <ul className=" space-y-2 text-text-body">
      {items.map((item, index) => (
        <li className=" text-xs md:text-base" key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default LegalList;