import Game from "@components/Game";
import PrivateRoute from "@components/PrivateRoute";
import GameLayout from "@layouts/Game";
import type { NextPageWithLayout } from "./_app";

const GamePage: NextPageWithLayout = () => {
  return (
    <PrivateRoute>
      <Game />
    </PrivateRoute>
  );
};

GamePage.getLayout = (page: React.ReactElement) => (
  <GameLayout>{page}</GameLayout>
);

export default GamePage;
