import { useRegisterSW } from 'virtual:pwa-register/react'

export function PWABadge() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) return null

  return (
    <div className="fixed bottom-4 right-4 z-[200] max-w-sm p-4 w-full border border-gray-700 bg-[var(--color-surface)] text-white shadow-lg rounded-lg">
      <div className="mb-4">
        {offlineReady ? (
          <span className="text-sm font-medium">
            App is ready to work offline
          </span>
        ) : (
          <span className="text-sm font-medium">
            New content available, click on reload button to update.
          </span>
        )}
      </div>
      <div className="flex gap-3 justify-end mt-2">
        {needRefresh && (
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition" onClick={() => updateServiceWorker(true)}>
            Reload
          </button>
        )}
        <button className="px-3 py-1 border border-gray-500 text-gray-300 rounded text-sm hover:bg-gray-700 transition" onClick={() => close()}>
          Close
        </button>
      </div>
    </div>
  )
}
