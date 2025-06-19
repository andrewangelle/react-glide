import { StartClient } from '@tanstack/react-start';
import { hydrateRoot } from 'react-dom/client';
import { createRouter } from 'src/router';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);

export default router;
