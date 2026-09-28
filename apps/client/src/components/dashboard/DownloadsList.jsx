export default function DownloadsList({ downloads, apiBase }) {
  return (
    <div className="glass-card divide-y divide-forge-border">
      {downloads.map((d) => (
        <div key={d._id} className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium">{d.fileName}</p>
            <p className="text-xs text-ink-500">{new Date(d.createdAt).toLocaleString()}</p>
          </div>
          <a
            href={`${apiBase}/downloads/${d._id}/file`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-emerald-400 hover:underline"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
