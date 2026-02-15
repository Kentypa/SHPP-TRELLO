import { createFileRoute } from "@tanstack/react-router";
import SquareOutline from "../assets/icons/test/square.svg?react";
import Square from "../assets/icons/test/square-small.svg?react";
import TriangleOutline from "../assets/icons/test/triangle.svg?react";
import Triangle from "../assets/icons/test/triangle-filled.svg?react";
import CircleOutline from "../assets/icons/test/circle.svg?react";
import Circle from "../assets/icons/test/circle-small.svg?react";
import Term from "../assets/icons/test/kitty-app.png";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex bg-neutral-50 flex-col justify-center items-center h-dvh">
      <div className="rounded-md overflow-hidden">
        <div className="w-180 p-2 bg-neutral-950 flex justify-between items-center">
          <div className="flex gap-2 text-neutral-50">
            <img src={Term} className="size-4" />
            <h4 className="text-[10px]">Kitty</h4>
          </div>
          <div className="flex gap-2">
            <div className="relative fill-sky-400 size-4 hover:fill-sky-600">
              <TriangleOutline className="absolute size-4 fill-sky-400 rotate-180" />
              <Triangle className="absolute size-2 translate-x-1/2 translate-y-1/3 rotate-180" />
            </div>
            <div className="relative size-4 fill-emerald-400 hover:fill-emerald-600">
              <SquareOutline className="absolute size-4 fill-emerald-400" />
              <Square className="absolute size-4" />
            </div>
            <div className="relative fill-rose-400 size-4 hover:fill-rose-600">
              <CircleOutline className="absolute size-4 fill-rose-400" />
              <Circle className="absolute size-4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
