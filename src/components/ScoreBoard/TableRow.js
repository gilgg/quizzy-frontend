import "./TableRow.scss";

const TableRow = ({ username, index, activeRow, setActiveRow }) => {
  return (
    <tr
      className={`table-row ${index === activeRow ? "active" : ""}`}
      onClick={() => {
        setActiveRow(index);
      }}
    >
      <td>{username.position}</td>
      <td className="td-name">{username.name}</td>
      <td>{username.score}</td>
      <td>{username.numberOfCorrectAnswers}</td>
      <td>{username.avgAnswerTime}</td>
    </tr>
  );
};

export default TableRow;
