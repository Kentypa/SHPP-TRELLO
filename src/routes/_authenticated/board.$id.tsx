import { createFileRoute } from "@tanstack/react-router";
import { List } from "../../features/board/components/List";
import { useBoardDetails } from "../../features/board/hooks/use-board-details";

export const Route = createFileRoute("/_authenticated/board/$id")({
  component: RouteComponent,
  params: { parse: ({ id }) => ({ id: Number(id) }) },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: boardData, isLoading, isSuccess } = useBoardDetails(id);

  if (isLoading) return <div>Is loading...</div>;

  return (
    <>
      {isSuccess && (
        <>
          <div
            className="flex p-6 bg-neutral-200"
            style={{ background: boardData.custom?.background }}
          >
            <h2>Board title: {boardData.title}</h2>
          </div>
          <main className="flex p-6 min-h-dvh">
            <List lists={boardData.lists}>
              <List.Items />
              <List.Creator />
              <List.CardModal />
            </List>
          </main>
        </>
      )}
    </>
  );
}
