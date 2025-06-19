import { createFileRoute } from '@tanstack/react-router';
import { GlideExample } from 'src/components/GlideExample';

export const Route = createFileRoute('/')({
  component: GlideExample,
});
