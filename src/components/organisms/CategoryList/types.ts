// import { UniqueIdentifier } from "@dnd-kit/core";
import type { MutableRefObject } from "react";

export interface TreeItem {
  id: string;
  title: string;
  children: TreeItem[];
  collapsed?: boolean;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: string | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
