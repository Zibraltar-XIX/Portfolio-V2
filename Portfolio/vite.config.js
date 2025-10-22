import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
        allowedHosts: ['unstriking-rosalva-abashedly.ngrok-free.dev'],
        hmr: {
            clientPort: 443
        }
    }
})
