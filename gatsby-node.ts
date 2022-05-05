import { SourceNodesArgs } from "gatsby";
import { fetchCV } from "./src/data/fetch-cv";

export const sourceNodes: (args: SourceNodesArgs) => void = ({
  createNodeId,
  store,
  cache,
  reporter,
  actions,
  createContentDigest,
}) => fetchCV({ createNodeId, createContentDigest, actions });
