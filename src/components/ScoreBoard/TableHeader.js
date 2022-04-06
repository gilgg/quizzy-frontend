import "./TableHeader.scss";
import HeaderItem from "./HeaderItem";

const TableHeader = () => {
  return (
    <thead className="table-header">
      <tr>
        <HeaderItem field="Position" />
        <HeaderItem field="Name" />
        <HeaderItem field="Score" />
        <HeaderItem field="# Correct Answers" />
        <HeaderItem field="Avg. Answer Time" />
      </tr>
    </thead>
  );
};

export default TableHeader;
