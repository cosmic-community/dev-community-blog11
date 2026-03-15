export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-6 text-sm text-gray-500">
        <p>Feito para comunidades de aprendizado com Cosmic.</p>
        <p>© {new Date().getFullYear()} Dev Community Blog.</p>
      </div>
    </footer>
  )
}