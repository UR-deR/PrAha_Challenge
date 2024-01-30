type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
};

export const Heading: React.FC<Props> = (props) => {
  const { level, children } = props;

  return (
    <>
      {level === 1 ? (
        <h1>{children}</h1>
      ) : level === 2 ? (
        <h2>{children}</h2>
      ) : level === 3 ? (
        <h3>{children}</h3>
      ) : level === 4 ? (
        <h4>{children}</h4>
      ) : level === 5 ? (
        <h5>{children}</h5>
      ) : (
        <h6>{children}</h6>
      )}
    </>
  );
};
