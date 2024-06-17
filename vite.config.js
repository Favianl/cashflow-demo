import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://favianl.github.io/cashflow-demo/',
  plugins: [react()],
});
