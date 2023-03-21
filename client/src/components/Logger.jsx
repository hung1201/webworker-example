const Logger = ({ logs }) => {
  return (
    <div className="logger">
      <h4>Logged Messages</h4>
      <ul>
        {logs.map((item, index) => (
          <li key={`v-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Logger;
