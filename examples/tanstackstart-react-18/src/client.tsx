import { StartClient } from "@tanstack/react-start";
import { hydrateRoot } from "react-dom/client";
import { getRouter } from "~/router";

const router = getRouter();

hydrateRoot(document, <StartClient router={router} />);

export default router;
