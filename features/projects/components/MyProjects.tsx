import Button from "@/components/Button";
import React from "react";
import { Logo } from "@/components/icons";
import { getProjects } from "@/DAI/projects";
import getAuth from "@/lib/getAuth";
import SomethingWentWrong from "@/components/SomethingWentWrong";

export default async function MyProjects() {
  const { id } = await getAuth();
  const projects = await getProjects(id);
  if (!projects) return <SomethingWentWrong />;

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-4 border-b border-b-border pb-4 border-dashed">
        <h5 className="capitalize font-medium">{"My Projects"}</h5>
        <Button btnType="secondary">View all</Button>
      </div>

      {projects.map(({ name, category }, i) => (
        <div
          key={i}
          className="flex items-center justify-between border border-border mb-2 p-2 last:mb-0 rounded-lg hover:bg-border duration-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="bg-border p-1.5 rounded-lg">
              <Logo className="size-6" />
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-gray text-xs">{category}</p>
            </div>
          </div>
          <Button btnType="IN_PROGRESS">In progress</Button>
        </div>
      ))}
    </div>
  );
}
