import "./HeaderItem.scss";

const HeaderItem = ({ field }) => {
  return (
    <th className={`${field.toLowerCase().replaceAll(" ", "_")}`}>
      <span className="field-name">{field}</span>
    </th>
  );
};

export default HeaderItem;
