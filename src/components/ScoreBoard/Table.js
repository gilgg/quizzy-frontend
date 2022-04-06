import "./Table.scss";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ users, activeRow, setActiveRow }) => {
  return (
    <>
      <table className="table">
        <TableHeader />
        <tbody>
          {users.map((username, index) => (
            <TableRow
              key={index}
              index={index}
              username={username}
              activeRow={activeRow}
              setActiveRow={setActiveRow}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
