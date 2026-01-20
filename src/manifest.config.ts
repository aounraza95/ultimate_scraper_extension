import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from '../package.json'

const { version } = packageJson

// Convert to major.minor.patch.label
const [major, minor, patch, label = '0'] = version
    .replace(/[^\d.-]+/g, '')
    .split(/[.-]/)

export default defineManifest(async (env) => ({
    manifest_version: 3,
    name:
        env.mode === 'staging'
            ? '[INTERNAL] Ultimate Scraper'
            : 'Ultimate Scraper',
    // up to four numbers separated by dots
    version: `${major}.${minor}.${patch}.${label}`,
    // semver is OK in "version_name"
    version_name: version,
    action: {
        default_title: 'Ultimate Scraper',
    },
    side_panel: {
        default_path: 'src/sidepanel.html',
    },
    permissions: [
        'sidePanel',
        'storage',
        'activeTab',
        'scripting',
        'tabs'
    ],
    background: {
        service_worker: 'src/background.ts',
        type: 'module',
    },
    content_scripts: [
        {
            matches: ['<all_urls>'],
            js: ['src/content.ts'],
            run_at: 'document_start',
        },
    ],
}))
