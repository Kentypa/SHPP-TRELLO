import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../shared/components/ui/Button";
import { BoardFormModal } from "../../features/home/components/BoardFormModal";
import { useBoardForm } from "../../features/home/hooks/use-board-form";
import { useGetBoards } from "../../features/home/hooks/use-get-boards";
import { BoardList } from "../../features/home/components/BoardList";

export const Route = createFileRoute("/_authenticated/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data: boardsData, isSuccess, isLoading } = useGetBoards();

  const boardController = useBoardForm();

  if (isLoading) return <h2>Loading data</h2>;

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-fit flex flex-col gap-3 items-center">
        <h1>Board page</h1>

        {isSuccess && (
          <BoardList
            boards={boardsData.boards}
            onEdit={(board) => boardController.modal.open(board)}
          />
        )}

        <Button
          className="rounded-md bg-green-500 p-2 w-fit text-white"
          onClick={() => boardController.modal.open()}
        >
          Add new board
        </Button>

        <BoardFormModal controller={boardController} />
      </div>
    </main>
  );
}
