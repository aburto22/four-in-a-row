import Game from "@components/Game";
import PrivateRoute from "@components/PrivateRoute";

const IndexPage = () => {
  return (
    <PrivateRoute>
      <Game />
    </PrivateRoute>
  );
};

export default IndexPage;
