import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { boardKeys } from "../shared/keys/board";
import { Button } from "../shared/components/ui/Button";
import { Board } from "../features/board/components/Board";
import { boardService } from "../shared/services/board-service";
import { BoardFormModal } from "../features/board/components/BoardFormModal";
import { useBoardForm } from "../features/board/hooks/use-board-form";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isSuccess, isLoading } = useQuery({ ...boardKeys.all });

  const queryClient = useQueryClient();

  const { mutate: removeBoard } = useMutation({
    mutationFn: boardService.removeBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.all.queryKey });
    },
  });

  const createBoardController = useBoardForm();

  if (isLoading) return <h2>Loading data</h2>;

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-fit flex flex-col gap-3 items-center">
        <h1>Board page</h1>

        {isSuccess && (
          <ul className="flex items-center gap-3">
            {data.boards.map((board) => (
              <Board key={board.id} {...board} removeBoard={removeBoard} />
            ))}
          </ul>
        )}

        <Button
          className="rounded-md bg-green-500 p-2 w-fit text-white"
          onClick={createBoardController.modal.toggleModal}
        >
          Add new board
        </Button>

        <BoardFormModal controller={createBoardController} />
      </div>
    </main>
  );
}
