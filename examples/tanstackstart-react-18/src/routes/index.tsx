import { createFileRoute } from '@tanstack/react-router';
import { GlideExample } from '~/components/GlideExample';

export const Route = createFileRoute('/')({
  component: GlideExample,
});
